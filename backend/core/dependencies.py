from backend.database.models import db
from sqlalchemy.orm import Session, sessionmaker

def create_session (): 
    try:
        Session = sessionmaker(bind=db)
        session = Session()
        yield session
    finally:
        session.close()