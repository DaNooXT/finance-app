from fastapi import HTTPException
from sqlalchemy.orm import Session
from repositories.auth_repositories import AuthRepository
from utils.jwt import create_token
from utils.authenticate_user import authenticate_user
from datetime import timedelta


class AuthService:

    def __init__(self, current_user, session: Session):
        self.repository = AuthRepository(current_user, session)
    
    def register (self, user):
        existing_user = self.repository.get_user_by_email(user.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Existing user")       
        try:
            new_user = self.repository.create_user(
                user.name,
                user.email,
                user.password
            )
        except Exception as e :
            print(e)
            raise HTTPException(status_code=500, detail="Internal error")
        return {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "description": "User successfully registered"
        }
    
    def login (self, user):
        user_db = self.repository.get_user_by_email(user.email)
        auth_user = authenticate_user(user_db, user.password)
        
        access_token = create_token(auth_user.id)
        refresh_token = create_token(auth_user.id, expire=timedelta(days=7))

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": auth_user.id,
                "name": auth_user.name,
                "email": auth_user.email
            },
            "token_type": "bearer"
        }
    
    def refresh (self, user):
        access_token = create_token(user.id)
        return {
            "access_token": access_token,
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email
            },
            "token_type": "bearer"
        }
    
    def login_form (self, user):
        user_db = self.repository.get_user_by_email(user.username)
        auth_user = authenticate_user (user_db, user.password)
        
        access_token = create_token(auth_user.id)
        return {
            "access_token": access_token,
            "token_type": "bearer"
        }
    
    def delete_user (self, id, current_user):
        existing_user = self.repository.get_user_by_id(id, current_user.id)
        try:
            self.repository.delete_user(existing_user)
        except Exception as e :
            print(e)
            raise HTTPException(status_code=500, detail="Internal error")
        return {"msg": "User delete successfuly"}