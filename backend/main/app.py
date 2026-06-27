from fastapi import FastAPI

App = FastAPI()

from backend.routes.auth import auth_route
from backend.routes.movimentations import movimentaion_route

App.include_router(auth_route)
App.include_router(movimentaion_route)