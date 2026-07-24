from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://finance-app-1gam.vercel.app",
]

app.add_middleware (
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from routes.auth import auth_route
from routes.movimentations import movimentation_route
from routes.dashboard import dashboard_route

app.include_router(auth_route)
app.include_router(movimentation_route)
app.include_router(dashboard_route)