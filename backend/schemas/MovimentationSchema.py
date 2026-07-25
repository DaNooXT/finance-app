from pydantic import BaseModel, field_validator
from database.enums import MovimentationCategories, MovimentationType
from decimal import Decimal
from datetime import date, datetime

class MovimentationSchema (BaseModel):
    amount: Decimal
    description: str
    type: MovimentationCategories
    movimentation_type: MovimentationType
    movimentation_date: datetime | date

    @field_validator("movimentation_date", mode="before")
    @classmethod
    def normalize_movimentation_date(cls, value):
        if isinstance(value, str):
            try:
                return datetime.fromisoformat(value)
            except ValueError:
                try:
                    return date.fromisoformat(value)
                except ValueError as exc:
                    raise ValueError("movimentation_date must be a valid ISO date/datetime") from exc
        return value

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
