from fastapi import FastAPI

App = FastAPI()

from backend.routes.auth import auth_route
from backend.routes.movimentations import movimentation_route

App.include_router(auth_route)
App.include_router(movimentation_route)