from sqlalchemy import Column, Integer, String, create_engine, Enum as SAEnum, Numeric, ForeignKey, func, DateTime
from sqlalchemy.orm import declarative_base
from database.enums import MovimentationCategories, MovimentationType
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_URL = f"sqlite:///{BASE_DIR}/bank.db"
db = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

base = declarative_base()

class User (base):
    __tablename__ = "users"

    id = Column("id", Integer, primary_key=True, autoincrement=True, nullable=False)
    name = Column("name", String, nullable=False)
    email = Column("email", String, nullable=False)
    password = Column("password", String, nullable=False)

    def __init__ (self, name, email,password):
        self.name = name
        self.email = email
        self.password = password


class Movimentations (base):
    __tablename__ = "movimentations"

    id = Column("id", Integer, primary_key=True, autoincrement=True, nullable=False)
    user_id = Column("user_id", Integer, ForeignKey("users.id"), nullable=False)
    amount = Column("amount", Numeric(10, 2), nullable=False)
    description = Column("description", String, nullable=False)
    type = Column("type", SAEnum(MovimentationCategories), nullable=False)
    movimentation_type = Column("movimentation_type", SAEnum(MovimentationType), nullable=False)
    movimentation_date = Column("movimentation_date", DateTime(timezone=True), server_default=func.now(), nullable=False)

    def __init__ (self, user_id, amount, description, type, movimentation_type):
        self.user_id = user_id
        self.amount = amount
        self.description = description
        self.type = type
        self.movimentation_type = movimentation_type