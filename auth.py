from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database.models import User
from backend.core.dependencies import create_session
from backend.schemas.AuthSchema import UsuarioSchema

auth_route = APIRouter(prefix="/auth", tags=["auth"])