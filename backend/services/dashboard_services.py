from fastapi import HTTPException
from sqlalchemy.orm import Session
from repositories.dashboard_repositories import DashboardRepository
from utils.date import get_current_month

class DashboardService:
     
    def __init__ (self, current_user, session: Session):
        self.repository = DashboardRepository(current_user, session)
    

    def dashboard (self, user_id):
        try:
            initial, end = get_current_month()
            all_movimentations = self.repository.get_movimentations_by_date(initial, end, user_id)
            summary = self.repository.calculate_summray(all_movimentations)
            expenses_category_porcentage = self.repository.get_categoty_porcentage_expenses(all_movimentations, summary["total_expense"])
            total_movimentations = self.repository.get_movimentations_len(all_movimentations)
            top_movimentation = self.repository.get_top_movimentation(all_movimentations)
        except Exception:
            raise HTTPException(status_code=500, detail="Internal several error")

        return {
            "summary": summary,
            "category": expenses_category_porcentage,
            "statistics": {
                "total_movimentations": total_movimentations,
                "top_movimentation": (
                    top_movimentation
                    if top_movimentation
                    else None
                )
            }
        }
    

    def dashboard_all (self, user_id):
        try:
            initial, end = self.repository.get_period(user_id)
            all_movimentations = self.repository.get_movimentations_by_date(initial, end, user_id)
            summary = self.repository.calculate_summray(all_movimentations)
            expenses_category_porcentage = self.repository.get_categoty_porcentage_expenses(all_movimentations, summary["total_expense"])
            total_movimentations = self.repository.get_movimentations_len(all_movimentations)
            top_movimentation = self.repository.get_top_movimentation(all_movimentations)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail="Internal several error")

        return {
            "summary": summary,
            "category": expenses_category_porcentage,
            "statistics": {
                "total_movimentations": total_movimentations,
                "top_movimentation": (
                    top_movimentation
                    if top_movimentation
                    else None
                )
            }
        }