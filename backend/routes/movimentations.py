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