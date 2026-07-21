from sqlalchemy.orm import Session
from sqlalchemy import asc, desc
from database.models import Movimentations
from database.enums import MovimentationCategories, MovimentationType

class DashboardRepository:

    def __init__ (self, current_user, session: Session):
        self.current_user = current_user
        self.session = session


    def get_all_movimentation (self):
        return (
            self.session.query(Movimentations)
            .all()
        )


    def get_movimentations_by_date (self, initial, end, user_id):
        if initial is None:
            all_movimentations = []
        else:
            all_movimentations = (
                self.session.query(Movimentations)
                .filter(
                Movimentations.user_id == user_id,
                Movimentations.movimentation_date >= initial,
                Movimentations.movimentation_date <= end)
                .all() 
            )

        return all_movimentations
    

    def calculate_summray (self, all_movimentation):
        total_income = 0
        total_expense = 0

        for movimentaton in all_movimentation:
            if movimentaton.movimentation_type == MovimentationType.EXPENSE:
                total_expense = total_expense + movimentaton.amount
            else:
                total_income = total_income + movimentaton.amount
        
        balence = total_income - total_expense

        return {
            "total_income": total_income,
            "total_expense": total_expense,
            "balence": balence
        }
    

    def get_categoty_porcentage_expenses (self, all_movimentation, total_expense):
        categories = {}

        for category in MovimentationCategories:
            if category == MovimentationCategories.SALARY:
                continue
            expense = sum(
                movimentation.amount
                for movimentation in all_movimentation
                if movimentation.movimentation_type == MovimentationType.EXPENSE
                and movimentation.type == category
            )

            porcentage = (
                (expense * 100 / total_expense)
                if total_expense > 0
                else 0
            )

            categories[category.value] = {
                "expense": expense,
                "porcentage": porcentage
            } 

        return categories
    

    def get_movimentations_len (self, all_movimentation):
        total_movimentation = len(all_movimentation)
        return total_movimentation
    

    def get_top_movimentation (self, all_movimentation):
        top_movimentation = max(
            (
                movimentation
                for movimentation in all_movimentation
                if movimentation.movimentation_type == MovimentationType.EXPENSE
            ),
            key= lambda movimentation: movimentation.amount,
            default=None
        )

        return top_movimentation


    def get_period(self, user_id):
        first = (
            self.session.query(Movimentations)
            .filter(Movimentations.user_id == user_id)
            .order_by(asc(Movimentations.movimentation_date))
            .first()
        )

        last = (
            self.session.query(Movimentations)
            .filter(Movimentations.user_id == user_id)
            .order_by(desc(Movimentations.movimentation_date))
            .first()
        )

        if first is None:
            return None, None

        return first.movimentation_date, last.movimentation_date