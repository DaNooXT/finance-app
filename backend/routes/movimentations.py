from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.database.models import Movimentations
from backend.core.dependencies import create_session
from backend.schemas.MovimentationSchema import MovimentationSchema, ResponseMovimentation

movimentation_route = APIRouter(prefix="/movimentation", tags=["movimentaion"])

@movimentation_route.post("/add_movimentation", response_model=ResponseMovimentation)
async def add_movimentation (movimentation: MovimentationSchema, session: Session = Depends(create_session)):
    new_movimentation = Movimentations(**movimentation.model_dump())
    try:
        session.add(new_movimentation)
        session.commit()
        session.refresh(new_movimentation)
    except:
        raise HTTPException(status_code=500, detail="Internal error")
    
    return new_movimentation


@movimentation_route.get("/list_movimentation", response_model=List[ResponseMovimentation])
async def list_movimentation (session: Session = Depends(create_session)):
    try:
        all_movimentation = session.query(Movimentations).all()
    except Exception as e :
        session.rollback()
        print(e)
        HTTPException(status_code=500, detail="Internal erro")

    return all_movimentation


@movimentation_route.put("/update_movimentation/{id}", response_model=ResponseMovimentation)
async def update_movimentation (id: int, movimentation: MovimentationSchema, session: Session = Depends(create_session)):
    movimentation_db = session.query(Movimentations).filter(Movimentations.id == id).first()

    if not movimentation_db:
        HTTPException(status_code=400, detail="Movimentation not found")

    for key, value in movimentation.model_dump().items():
        setattr(movimentation_db, key, value)

    try:
        session.commit()
        session.refresh(movimentation_db)
    except:
        session.rollback()
        raise HTTPException(status_code=500, detail="Internal error")

    return movimentation_db