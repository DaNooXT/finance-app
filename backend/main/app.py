from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

App = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

App.add_middleware (
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from backend.routes.auth import auth_route
from backend.routes.movimentations import movimentation_route
from backend.routes.dashboard import dashboard_route

App.include_router(auth_route)
App.include_router(movimentation_route)
App.include_router(dashboard_route)