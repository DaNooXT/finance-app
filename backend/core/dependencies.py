from fastapi import Depends, HTTPException
from jose import jwt, JWTError, ExpiredSignatureError
from backend.database.models import db
from sqlalchemy.orm import Session, sessionmaker
from backend.core.security import oauth2_schema
from backend.core.config import  SECRET_KEY, ALGORITHM
from backend.database.models import User

def get_db (): 
    try:
        Session = sessionmaker(bind=db)
        session = Session()
        yield session
    finally:
        session.close()

def get_current_user (token: str = Depends(oauth2_schema), session: Session = Depends(get_db)):
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = decoded_token.get("sub")

    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Expire token")

    except JWTError:
        raise HTTPException(status_code=401, detail="Access denied")
    
    if not user_id: 
        raise HTTPException(status_code=401, detail="Access denied")
    
    usuario = session.query(User).filter(User.id == int(user_id)).first()

    if not usuario:
        raise HTTPException(status_code=400, detail="Access denied")
    
    return usuario