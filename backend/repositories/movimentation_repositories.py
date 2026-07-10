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