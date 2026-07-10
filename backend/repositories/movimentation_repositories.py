from sqlalchemy.orm import Session
from backend.database.models import Movimentations

class MovimentationRepository:

    def __init__ (self, session: Session):
        self.session = session

    def create_movimentation (self, movimentation: Movimentations):
        try:
            self.session.add(movimentation)
            self.session.commit()
            self.session.refresh(movimentation)
        except Exception:
            self.session.rollback()
        return movimentation
    

    def get_all_movimentations (self):
        all_movimentation = self.session.query(Movimentations).all()
        return all_movimentation
    

    def get_movimentation_by_id (self, id):
        existing_movimentation = self.session.query(Movimentations).filter(Movimentations.id == id).first()
        return existing_movimentation
    

    def delete_movimentation (self, movimentation):
        self.session.delete(movimentation)
        self.session.commit()
        return {"msg": "movimentation delete successfuly"}