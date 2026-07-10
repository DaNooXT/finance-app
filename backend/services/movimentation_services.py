from sqlalchemy.orm import Session
from fastapi import HTTPException
from backend.repositories.movimentation_repositories import MovimentationRepository
from backend.database.models import Movimentations

class MovimentationServices:

    def __init__ (self, session: Session):
        self.repository = MovimentationRepository(session)

    def add_new_movimentation (self, movimentation):
        try:
            new_movimentation = Movimentations(
                user_id=movimentation.user_id,
                amount=movimentation.amount,
                description=movimentation.description,
                type=movimentation.type,
                movimentation_type=movimentation.movimentation_type,
            )
        except Exception as e:
            print(e)
            raise HTTPException(status_code=400, detail="Error to add new movimentation")
        return self.repository.create_movimentation(new_movimentation)
    

    def show_all_movimentations (self):
        try:
            all_movimentations = self.repository.get_all_movimentations()
        except Exception as e:
            print(e)
            raise HTTPException(status_code=400, detail="Was not possible get all movimentations")
        return all_movimentations
        

    def remove_movimentation(self, id):
        existing_movimentation = self.repository.get_movimentation_by_id(id)
        if not existing_movimentation:
            raise HTTPException(status_code=400, detail="Movimentation not found")
        try:
            self.repository.delete_movimentation(existing_movimentation)
        except Exception:
            raise HTTPException(status_code=500, detail="Internal several error")
        return {"msg": "movimentation delete successfuly"}

    
    def update_movimentation (self, id, movimentation):
        movimentation_db = self.repository.get_movimentation_by_id(id)
        if movimentation_db is None:
            raise HTTPException(status_code=404, detail="Movimentation not found")
        try:
            self.repository.update_movimentation(movimentation, movimentation_db)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail="Internal serveral error")
        return movimentation_db