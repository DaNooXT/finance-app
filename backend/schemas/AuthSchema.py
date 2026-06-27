from pydantic import BaseModel

class UserSchema (BaseModel):
    name: str
    password: str

    class Config:
        from_attributes = True

class ResponseUser (BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True