from pydantic import BaseModel

class UserSchema (BaseModel):
    name: str
    email: str
    password: str

    class Config:
        from_attributes = True

class UserLogin (BaseModel):
    email: str
    password: str

    class config:
        from_attributes = True

class UserLoginResponse (BaseModel):
    id: int
    email: str
    password: str

    class config:
        from_attributes = True

class ResponseUser (BaseModel):
    id: int
    name: str
    description: str

    class Config:
        from_attributes = True