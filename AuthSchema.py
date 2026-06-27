from pydantic import BaseModel

class UsuarioSchema (BaseModel):
    name: str

    class Config:
        from_attributes = True