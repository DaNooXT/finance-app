from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.database.models import Movimentations
from backend.core.dependencies import create_session
from backend.schemas.MovimentationSchema import MovimentationSchema, ResponseMovimentation
from backend.services.movimentation_services import MovimentationServices, MovimentationRepository

movimentation_route = APIRouter(prefix="/movimentation", tags=["movimentaion"])

@movimentation_route.post("/add_movimentation", response_model=ResponseMovimentation)
async def add_movimentation (movimentation: MovimentationSchema, session: Session = Depends(create_session)):
    service = MovimentationServices(session)
    return service.add_new_movimentation(movimentation)


@movimentation_route.get("/list_movimentation", response_model=List[ResponseMovimentation])
async def list_movimentation (session: Session = Depends(create_session)):
    service = MovimentationServices(session)
    return service.show_all_movimentations()


@movimentation_route.put("/update_movimentation/{id}", response_model=ResponseMovimentation)
async def update_movimentation (id: int, movimentation: MovimentationSchema, session: Session = Depends(create_session)):
    service = MovimentationServices(session)
    return service.update_movimentation(id, movimentation)


@movimentation_route.delete("/delete_movimentation/{id}")
async def delete_movimentation (id: int, session: Session = Depends(create_session)):
    service = MovimentationServices(session)
    return service.remove_movimentation(id)