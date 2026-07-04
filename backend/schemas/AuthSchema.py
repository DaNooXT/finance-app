from pydantic import BaseModel

class UserSchema (BaseModel):
    name: str
    email: str
    password: str

    class Config:
        from_attributes = True

class ResponseUser (BaseModel):
    id: int
    name: str
    description: str

    class Config:
        from_attributes = True