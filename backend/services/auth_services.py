from fastapi import HTTPException
from sqlalchemy.orm import Session
from backend.repositories.auth_repositories import AuthRepository

class AuthService:

    def __init__(self, session: Session):
        self.repository = AuthRepository(session)
    
    def register (self, user):
        existing_user = self.repository.get_user_by_email(user.email)
        if existing_user:
            HTTPException(status_code=400, detail="Existing user")       
        try:
            new_user = self.repository.create_user(
                user.name,
                user.email,
                user.password
            )
        except Exception:
            raise HTTPException(status_code=500, detail="Internal error")
        return {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "description": "User successfully registered"
        }