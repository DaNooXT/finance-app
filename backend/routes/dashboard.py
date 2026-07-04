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

    food_expense = sum(
        movimentation.amount                
        for movimentation in all_movimentation
        if movimentation.movimentation_type == MovimentationType.EXPENSE 
        and movimentation.type == MovimentationCategories.FOOD
    )
    
    food_porcent_expense = (
        (food_expense * 100) / total_expense
        if food_expense > 0
        else 0
    )

    transport_expense = sum(
        movimentation.amount
        for movimentation in all_movimentation
        if movimentation.movimentation_type == MovimentationType.EXPENSE
        and movimentation.type == MovimentationCategories.TRANSPORT
    )

    transport_porcent_expense = (
        (transport_expense * 100) / total_expense
        if transport_expense > 0
        else 0
    )

    house_expense = sum(
        movimentation.amount
        for movimentation in all_movimentation
        if movimentation.movimentation_type == MovimentationType.EXPENSE
        and movimentation.type == MovimentationCategories.HOUSE
    )

    house_porcent_expense = (
        (house_expense * 100) / total_expense
        if house_expense > 0
        else 0
    )

    health_expense = sum(
        movimentation.amount
        for movimentation in all_movimentation
        if movimentation.movimentation_type == MovimentationType.EXPENSE
        and movimentation.type == MovimentationCategories.HEALTH
    )

    health_porcent_expense = (
        (health_expense * 100) / total_expense
        if health_expense > 0
        else 0
    )

    leisure_expense = sum(
        movimentation.amount
        for movimentation in all_movimentation
        if movimentation.movimentation_type == MovimentationType.EXPENSE
        and movimentation.type == MovimentationCategories.LEISURE
    )

    leisure_porcent_expense = (
        (leisure_expense * 100) / total_expense
        if leisure_expense > 0
        else 0
    )

    subscriptions_expense = sum(
        movimentation.amount
        for movimentation in all_movimentation
        if movimentation.movimentation_type == MovimentationType.EXPENSE
        and movimentation.type == MovimentationCategories.SUBSCRIPTIONS
    )

    subscriptions_porcent_expense = (
        (subscriptions_expense * 100) / total_expense
        if subscriptions_expense > 0
        else 0
    )

    clothing_expense = sum(
        movimentation.amount
        for movimentation in all_movimentation
        if movimentation.movimentation_type == MovimentationType.EXPENSE
        and movimentation.type == MovimentationCategories.CLOTHING
    )

    clothing_porcent_expense = (
        (clothing_expense * 100) / total_expense
        if clothing_expense > 0
        else 0
    )

    pets_expense = sum(
        movimentation.amount
        for movimentation in all_movimentation
        if movimentation.movimentation_type == MovimentationType.EXPENSE
        and movimentation.type == MovimentationCategories.PETS
    )

    pets_porcent_expense = (
        (pets_expense * 100) / total_expense
        if pets_expense > 0
        else 0
    )

    gifts_expense = sum(
        movimentation.amount
        for movimentation in all_movimentation
        if movimentation.movimentation_type == MovimentationType.EXPENSE
        and movimentation.type == MovimentationCategories.GIFTS
    )

    gifts_porcent_expense = (
        (gifts_expense * 100) / total_expense
        if gifts_expense > 0
        else 0
    )

    others_expense = sum(
        movimentation.amount
        for movimentation in all_movimentation
        if movimentation.movimentation_type == MovimentationType.EXPENSE
        and movimentation.type == MovimentationCategories.OTHERS
    )

    others_porcent_expense = (
        (others_expense * 100) / total_expense
        if others_expense > 0
        else 0
    )
    
    return {
    "all_movimentation": all_movimentation,
    "month_balence": month_balence,
    "total_expense": total_expense,

    "food_expense": food_expense,
    "food_porcent_expense": food_porcent_expense,

    "transport_expense": transport_expense,
    "transport_porcent_expense": transport_porcent_expense,

    "house_expense": house_expense,
    "house_porcent_expense": house_porcent_expense,

    "health_expense": health_expense,
    "health_porcent_expense": health_porcent_expense,

    "leisure_expense": leisure_expense,
    "leisure_porcent_expense": leisure_porcent_expense,

    "subscriptions_expense": subscriptions_expense,
    "subscriptions_porcent_expense": subscriptions_porcent_expense,

    "clothing_expense": clothing_expense,
    "clothing_porcent_expense": clothing_porcent_expense,

    "pets_expense": pets_expense,
    "pets_porcent_expense": pets_porcent_expense,

    "gifts_expense": gifts_expense,
    "gifts_porcent_expense": gifts_porcent_expense,

    "others_expense": others_expense,
    "others_porcent_expense": others_porcent_expense,
    }