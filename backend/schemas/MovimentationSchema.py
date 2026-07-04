from pydantic import BaseModel 
from backend.database.enums import MovimentationCategories, MovimentationType
from decimal import Decimal
from datetime import datetime

class MovimentationSchema (BaseModel):
    user_id: int
    amount: Decimal
    description: str
    type: MovimentationCategories
    movimentation_type: MovimentationType

    class Config:
        from_attributes = True

class ResponseMovimentation (BaseModel):
    id: int
    user_id: int
    amount: Decimal
    description: str
    type: MovimentationCategories
    movimentation_type: MovimentationType
    movimentation_date: datetime

    class Config:
        from_attributes = True
