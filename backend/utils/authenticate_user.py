from sqlalchemy.orm import Session
from database.models import User
from core.security import crypt_context
from fastapi import HTTPException

def authenticate_user (user_db, password):
    if not user_db:
        raise HTTPException(status_code=400, detail="Email ou senha invalidos")
    
    elif not crypt_context.verify(password, user_db.password):
        raise HTTPException(status_code=400, detail="Email ou senha invalidos")
    
    return user_db