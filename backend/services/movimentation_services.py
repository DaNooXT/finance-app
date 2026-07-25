from sqlalchemy.orm import Session
from fastapi import HTTPException
from repositories.movimentation_repositories import MovimentationRepository
from database.models import Movimentations
from datetime import date, datetime

class MovimentationServices:

    def __init__ (self, current_user, session: Session):
        self.repository = MovimentationRepository(current_user, session)

    def add_new_movimentation (self, movimentation, current_user):
        try:
            movimentation_date = movimentation.movimentation_date
            if isinstance(movimentation_date, date) and not isinstance(movimentation_date, datetime):
                movimentation_date = datetime.combine(movimentation_date, datetime.min.time())

            new_movimentation = Movimentations(
                user_id=current_user.id,
                amount=movimentation.amount,
                description=movimentation.description,
                type=movimentation.type,
                movimentation_type=movimentation.movimentation_type,
                movimentation_date=movimentation_date
            )
        except Exception as e:
            print(e)
            raise HTTPException(status_code=400, detail="Error to add new movimentation")
        return self.repository.create_movimentation(new_movimentation)
    

    def show_movimentations (self, filters, current_user):
        try:
            all_movimentations = self.repository.get_movimentations(filters, current_user.id)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=400, detail="Was not possible get all movimentations")
        return all_movimentations
        

    def remove_movimentation(self, id, current_user):
        existing_movimentation = self.repository.get_movimentation_by_id(id, current_user.id)
        if not existing_movimentation:
            raise HTTPException(status_code=400, detail="Movimentation not found")
        try:
            self.repository.delete_movimentation(existing_movimentation)
        except Exception:
            raise HTTPException(status_code=500, detail="Internal several error")
        return {"msg": "movimentation delete successfuly"}

    
    def update_movimentation (self, id, movimentation, current_user):
        movimentation_db = self.repository.get_movimentation_by_id(id, current_user.id)
        if movimentation_db is None:
            raise HTTPException(status_code=404, detail="Movimentation not found")
        try:
            self.repository.update_movimentation(movimentation, movimentation_db)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail="Internal serveral error")
        return movimentation_db