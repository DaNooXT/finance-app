from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from core.dependencies import get_db
from services.dashboard_services import DashboardService

dashboard_route = APIRouter(prefix="/dashboard", tags=["dashboard"])

@dashboard_route.get("/month")
async def get_dashboard_month (session: Session = Depends(get_db)):
    service = DashboardService(session)
    return service.dashboard()

@dashboard_route.get("")
async def get_dashboard (session: Session = Depends(get_db)):
    service = DashboardService(session)
    return service.dashboard_all()