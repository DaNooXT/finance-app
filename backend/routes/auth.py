from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.models import User
from backend.core.dependencies import create_session
from backend.schemas.AuthSchema import UserSchema, ResponseUser

auth_route = APIRouter(prefix="/auth", tags=["auth"])

@auth_route.post("/register", response_model=ResponseUser)
async def register (user: UserSchema, session: Session = Depends(create_session)):
    
    existing_user = session.query(User).filter(User.name == user.name).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Existing user")
    
    try:
        new_user = User(name=user.name, password=user.password)
        session.add(new_user)
        session.commit()
        session.refresh(new_user)
    except Exception as e:
        session.rollback()
        print(e)
        raise HTTPException(status_code=500, detail="Internal error")
    
    return {
        "id": new_user.id,
        "name": new_user.name,
        "description": "User successfully registered"
    }