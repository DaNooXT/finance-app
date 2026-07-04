from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from backend.core.dependencies import create_session
from backend.utils.date import get_current_month
from backend.database.models import Movimentations
from backend.database.enums import MovimentationType, MovimentationCategories

dashboard_route = APIRouter(prefix="/dashboard", tags=["dashboard"])

@dashboard_route.get("/get_dashboard/month")
async def get_dashboard_month (session: Session = Depends(create_session)):

    initial, end = get_current_month()

    all_movimentation = session.query(Movimentations).filter(
        Movimentations.movimentation_date >= initial,
        Movimentations.movimentation_date < end
        ).all()
    
    total_income = 0
    total_expense = 0

    for movimentation in all_movimentation:
        if movimentation.movimentation_type == MovimentationType.INCOME:
            total_income = total_income + movimentation.amount
        elif movimentation.movimentation_type == MovimentationType.EXPENSE:
            total_expense = total_expense + movimentation.amount

    month_balence = total_income - total_expense

    categories = {}

    for category in MovimentationCategories:
        if category == MovimentationCategories.SALARY:
            continue

        expense = sum(
            movimentation.amount
            for movimentation in all_movimentation
            if movimentation.movimentation_type == MovimentationType.EXPENSE
            and type == category
        )

        percentage = (
            (expense * 100 / total_expense)
            if expense > 0 
            else 0
        )

        categories[category.value] = {
            "expense": expense,
            "percentege": percentage
        }

    len_movimentation = len(all_movimentation)

    top_movimentation =  max(
        (
            movimentation
            for movimentation in all_movimentation
            if movimentation.movimentation_type == MovimentationType.EXPENSE
        ),

        key= lambda movimentation: movimentation.amount,
        default=None
    )

    return {
        "summary": {
                "month_balence": month_balence,
                "total_expense": total_expense,
                "total_income": total_income,
        },
        "categories" : categories,
        "statistics": {
            "len_movimentation": len_movimentation,
            "top_movimentation": top_movimentation
        }
    }