Feature: Book a cab

  A customer wants to book a cab in order to go from a point A to a point B

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
  And some drivers are available nearby "<drivers_nearby>"
  When I attempt to book a ride from "<start_address>" to "<arrival_address>"
  Then a RideRequest is "<?created>"
  #And "<drivers_nearby>" are "<?notified>"
    Examples: the happy path
      | customer_id | drivers_nearby    | start_address    | arrival_address | ?created | ?notified |
      | matthieu    | eymeric           | 11 rue Ducouedic | 13 rue Fautras  | created  | notified  |
      | remy        | eymeric,matthieu  | 11 rue Ducouedic | 13 rue Fautras  | created  | notified  |
    Examples: no one's nearby
      | customer_id | drivers_nearby    | start_address    | arrival_address | ?created   | ?notified   |
      | matthieu    | -                 | 11 rue Ducouedic | 13 rue Fautras  | notCreated | notNotified |

