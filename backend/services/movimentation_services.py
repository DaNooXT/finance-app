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
        