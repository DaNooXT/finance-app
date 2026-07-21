from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from core.dependencies import get_db, get_current_user
from schemas.AuthSchema import UserSchema, ResponseUser, UserLogin
from services.auth_services import AuthService
from database.models import User

auth_route = APIRouter(prefix="/auth", tags=["auth"])

@auth_route.post("/register", response_model=ResponseUser)
async def register (user: UserSchema, session: Session = Depends(get_db)):
    service = AuthService(session)
    return service.register(user)

@auth_route.post ("/login")
async def login (user: UserLogin, session: Session = Depends(get_db)):
    service = AuthService(session)
    return service.login(user)

@auth_route.post ("/refresh")
async def refresh (user: User = Depends(get_current_user), session: Session = Depends(get_db)):
    service = AuthService(session)
    return service.refresh(user)

@auth_route.post ("/login-form")
async def login_form (user: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_db)):
    service = AuthService(session)
    return service.login_form(user)

@auth_route.delete ("/delete_user/{id}")
async def delete_user (id: int, session: Session = Depends(get_db)):
    service = AuthService(session)
    return service.delete_user(id)