from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.core.dependencies import create_session
from backend.schemas.AuthSchema import UserSchema, ResponseUser
from backend.services.auth_services import AuthService

auth_route = APIRouter(prefix="/auth", tags=["auth"])

@auth_route.post("/register", response_model=ResponseUser)
async def register (user: UserSchema, session: Session = Depends(create_session)):
    service = AuthService(session)
    return service.register(user)