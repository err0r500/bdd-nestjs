Feature: Any customer can book a cab

  A customer wants to book a cab in order to go from a point A to a point B

Background:
Given some customers exist:
    | id  | firstName   | lastName |
    | abc | Matthieu    | Jacquot  |
    | def | Remy        | Tinco   |

Given some drivers exist:
    | id  | firstName | lastName |
    | abc | Eymeric   | Jacquot  |
    | def | Matthieu  | Polo     |

Scenario Outline: sufficient balance
Given I'm authenticated as the customer "<customer_firstname>"
And the balance on my account is "<balance_before>" euros
When when I attempt to order driver's "<driver_firstname>" cab from "<starting_address>" to "<arrival_address>"
Then booking is effective
And the balance of my account is "<balance_after>" euros
Examples:
    | customer_firstname | balance_before | balance_after | driver_firstname | starting_address               | arrival_address                   |
    | Matthieu           | 35             | 5             | Eymeric          | 43 rue Archereau 75019 Paris   | 2 rue Clisson 75013 Paris         |
