from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from core.dependencies import get_db, get_current_user
from schemas.AuthSchema import UserSchema, ResponseUser, UserLogin
from services.auth_services import AuthService
from database.models import User

auth_route = APIRouter(prefix="/auth", tags=["auth"])

@auth_route.post("/register", response_model=ResponseUser)
async def register (current_user: UserSchema, session: Session = Depends(get_db)):
    service = AuthService(current_user, session)
    return service.register(current_user)

@auth_route.post ("/login")
async def login (current_user: UserLogin, session: Session = Depends(get_db)):
    service = AuthService(current_user, session)
    return service.login(current_user)

@auth_route.post ("/refresh")
async def refresh (current_user: User = Depends(get_current_user), session: Session = Depends(get_db)):
    service = AuthService(current_user, session)
    return service.refresh(current_user)

@auth_route.post ("/login-form")
async def login_form (current_user: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_db)):
    service = AuthService(current_user, session)
    return service.login_form(current_user)

@auth_route.delete ("/{id}")
async def delete_user (id: int, current_user: User = Depends(get_current_user), session: Session = Depends(get_db)):
    service = AuthService(current_user, session)
    return service.delete_user(id, current_user)