from enum import Enum

class MovimentationType (str, Enum):
    INCOME = "income"
    EXPENSE = "expense"


class ExpenseCategory (str, Enum):
    FOOD = "food"
    TRANSPORT = "transport"
    HOUSE = "house"
    HEALTH = "health"
    LEISURE = "leisure"
    SUBSCRIPTIONS = "subscriptions"
    CLOTHING = "clothing"
    PETS = "pets"
    GIFTS = "gifts"
    OTHERS = "others"
    SALARY = "salary"