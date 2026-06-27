from pydantic import BaseModel 
from backend.database.enums import ExpenseCategory, MovimentationType
from decimal import Decimal

class MovimentationSchema (BaseModel):
    amount: Decimal
    description: str
    type: ExpenseCategory
    movimentation_type: MovimentationType

    class Config:
        from_attributes = True