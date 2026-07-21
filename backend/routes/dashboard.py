from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from database.models import User
from core.dependencies import get_db, get_current_user
from services.dashboard_services import DashboardService

dashboard_route = APIRouter(prefix="/dashboard", tags=["dashboard"])

@dashboard_route.get("/month")
async def get_dashboard_month (current_user: User = Depends(get_current_user), session: Session = Depends(get_db)):
    service = DashboardService(current_user, session)
    return service.dashboard(current_user.id)

@dashboard_route.get("")
async def get_dashboard (current_user: User = Depends(get_current_user), session: Session = Depends(get_db)):
    service = DashboardService(current_user, session)
    return service.dashboard_all(current_user.id)