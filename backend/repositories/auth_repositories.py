from sqlalchemy.orm import Session
from backend.database.models import User

class AuthRepository:

    def __init__ (self, session: Session):
        self.session = session

    def get_user_by_email (self, email: str): 
        return (
            self.session.query(User)
            .filter(User.email == email)
            .first()
        )
    
    def create_user (self, name: str, email: str, password: str):
        user = User(
            name=name,
            email=email,
            password=password
        )

        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)

        return user