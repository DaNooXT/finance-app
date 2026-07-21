from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.models import User
from typing import List
from core.dependencies import get_db, get_current_user
from schemas.MovimentationSchema import MovimentationSchema, ResponseMovimentation
from services.movimentation_services import MovimentationServices

movimentation_route = APIRouter(prefix="/movimentation", tags=["movimentaion"])

@movimentation_route.post("", response_model=ResponseMovimentation)
async def add_movimentation (movimentation: MovimentationSchema, current_user: User = Depends(get_current_user),session: Session = Depends(get_db)):
    service = MovimentationServices(session)
    return service.add_new_movimentation(movimentation, current_user)


@movimentation_route.get("", response_model=List[ResponseMovimentation])
async def list_movimentation (current_user: User = Depends(get_current_user), session: Session = Depends(get_db)):
    service = MovimentationServices(session)
    return service.show_movimentations(current_user)


@movimentation_route.put("/{id}", response_model=ResponseMovimentation)
async def update_movimentation (id: int, movimentation: MovimentationSchema, session: Session = Depends(get_db)):
    service = MovimentationServices(session)
    return service.update_movimentation(id, movimentation)


@movimentation_route.delete("/{id}")
async def delete_movimentation (id: int, session: Session = Depends(get_db)):
    service = MovimentationServices(session)
    return service.remove_movimentation(id)