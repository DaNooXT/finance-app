from fastapi import HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from backend.core.dependencies import create_session
from backend.utils.date import get_current_month
from backend.database.models import Movimentations
from backend.database.enums import MovimentationType

dashboard_route = APIRouter(prefix="/dashboard", tags=["dashboard"])

@dashboard_route.get("/get_dashboard/month")
async def get_dashboard_month (session: Session = Depends(create_session)):
    initial, end = get_current_month()

    all_movimentation = session.query(Movimentations).filter(
        Movimentations.movimentation_date >= initial,
        Movimentations.movimentation_date < end
        ).all()
    
    income = 0
    expense = 0

    for movimentation in all_movimentation:
        if movimentation.movimentation_type == MovimentationType.INCOME:
            income = income + movimentation.amount
        elif movimentation.movimentation_type == MovimentationType.EXPENSE:
            expense = expense + movimentation.amount

    month_balence = income - expense

    total_expense = sum(
        movimentation.amount
        for movimentation in all_movimentation
        if movimentation.movimentation_type == MovimentationType.EXPENSE
        )
    
    return month_balence, total_expense
