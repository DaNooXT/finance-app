from fastapi import APIRouter, Depends 
# from sqlalchemy.orm import Session
# from backend.core.dependencies import create_session
# from schemas.MovimentationSchema import MovimentationSchema

movimentaion_route = APIRouter(prefix="/movimentation", tags=["movimentaion"])

# @movimentaion_route.post()
# async def movimentation (movimentation: MovimentationSchema, seesion: Session = Depends(create_session)):
#     pass