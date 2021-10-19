Feature: Book a cab

  A customer wants to book a cab in order to go from a start address to an arrival address

Background:
Given some customers exist:
    | id       | firstName   | lastName |
    | matthieu | Matthieu    | Jacquot  |
    | remy     | Remy        | Tinco    |

Given some drivers exist:
    | id       | firstName | lastName |
    | eymeric  | Eymeric   | Jacquot  |
    | matthieu | Matthieu  | Polo     |

Scenario Outline: creating the rideRequest
  Given I'm authenticated as the customer "<customer_id>"
  And some drivers are available near start "<drivers_nearby>"
  When I attempt to book a ride from "<start_address>" to "<arrival_address>" with id "<id>"
  Then a RideRequest is "<?created>" with id "<id>"
  And a RideRequestCreatedEvent is "<?created>" for rideRequest "<id>"
    Examples: the happy path
      | id | customer_id | drivers_nearby    | start_address    | arrival_address | ?created |
      | a  | matthieu    | eymeric           | 11 rue Ducouedic | 13 rue Fautras  | created  |
      | b  | remy        | eymeric,matthieu  | 11 rue Ducouedic | 13 rue Fautras  | created  |
    Examples: no one's nearby
      | id | customer_id | drivers_nearby    | start_address    | arrival_address | ?created |
      | -  | matthieu    | -                 | 11 rue Ducouedic | 13 rue Fautras  | NoOp     |

Scenario Outline: notify drivers near start address or customer if nobody's available
  Given some drivers are available near start "<drivers_nearby>"
  And RideRequest have been created
      | id | customer_id | start_address    | arrival_address |
      | a  | matthieu    | 11 rue Ducouedic | 13 rue Fautras  |
  When the RideRequestCreatedEvent "<request_id>" is received
  Then drivers are notified : "<?driver_notified>"
  And customer "<customer_id>" is notified : "<?customer_notified>"
    Examples: the happy path
      | request_id | customer_id | drivers_nearby    | ?driver_notified | ?customer_notified |
      | a          | matthieu    | eymeric           | true             | false              |
      | a          | matthieu    | eymeric,matthieu  | true             | false              |
    Examples: no one's nearby
      | request_id | customer_id | drivers_nearby    | ?driver_notified | ?customer_notified |
      | a          | matthieu    | -                 | false            | true               |

