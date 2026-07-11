from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from backend.core.dependencies import create_session
from backend.services.dashboard_services import DashboardService

dashboard_route = APIRouter(prefix="/dashboard", tags=["dashboard"])

@dashboard_route.get("/get_dashboard/month")
async def get_dashboard_month (session: Session = Depends(create_session)):
    service = DashboardService(session)
    return service.dashboard()