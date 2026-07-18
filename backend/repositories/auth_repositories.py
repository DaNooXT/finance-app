from sqlalchemy.orm import Session
from backend.database.models import User
from backend.core.security import crypt_context

class AuthRepository:

    def __init__ (self, session: Session):
        self.session = session

    def get_user_by_email (self, email: str): 
        return (
            self.session.query(User)
            .filter(User.email == email)
            .first()
        )
    
    def get_user_by_id (self, id: int): 
        return (
        self.session.query(User)
        .filter(User.id == id)
        .first()
    )
    
    def create_user (self, name: str, email: str, password: str):
        hash_psw = crypt_context.hash(password)

        user = User(
            name=name,
            email=email,
            password=hash_psw
        )

        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)

        return user
    
    def delete_user (self, user):
        self.session.delete (user)
        self.session.commit()
        return {"msg": "User deleted successfully"}
