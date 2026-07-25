from sqlalchemy import extract
from sqlalchemy.orm import Session
from database.models import Movimentations
from database.enums import MovimentationCategories, MovimentationType
from dataclasses import asdict


class MovimentationRepository:

    def __init__ (self, current_user, session: Session):
        self.current_user = current_user
        self.session = session

    def create_movimentation (self, movimentation: Movimentations):
        try:
            self.session.add(movimentation)
            self.session.flush()
            self.session.refresh(movimentation)
            self.session.commit()
        except Exception as exc:
            self.session.rollback()
            raise exc

        if getattr(movimentation, "id", None) is None:
            self.session.expire_all()
            reloaded_movimentation = (
                self.session.query(Movimentations)
                .filter(
                    Movimentations.user_id == movimentation.user_id,
                    Movimentations.description == movimentation.description,
                    Movimentations.amount == movimentation.amount,
                    Movimentations.movimentation_date == movimentation.movimentation_date,
                )
                .order_by(Movimentations.id.desc())
                .first()
            )
            if reloaded_movimentation is not None:
                return reloaded_movimentation
            raise ValueError("Movimentation id was not generated")

        return movimentation
    

    def get_movimentations (self, filters, user_id):
        filters_dict = asdict(filters)

        all_movimentation = (
            self.session.query(Movimentations)
            .filter(Movimentations.user_id == user_id)
        )

        search_term = filters_dict.get("search")
        if search_term:
            search_term = str(search_term).strip()
            if search_term:
                all_movimentation = all_movimentation.filter(
                    Movimentations.description.ilike(f"%{search_term}%")
                )

        for key, value in filters_dict.items():
            if value is None or key in ("search", "month", "year", "page", "pageSize"):
                continue

            if key == "type":
                normalized_value = {
                    "receita": MovimentationType.INCOME,
                    "despesa": MovimentationType.EXPENSE,
                }.get(str(value).lower())
                if normalized_value is not None:
                    all_movimentation = all_movimentation.filter(
                        Movimentations.movimentation_type == normalized_value
                    )
                continue

            if key == "category":
                normalized_value = None
                if isinstance(value, str):
                    normalized_value = value.strip()
                if normalized_value:
                    category_enum = None
                    for enum_item in MovimentationCategories:
                        if enum_item.value == normalized_value:
                            category_enum = enum_item
                            break
                    if category_enum is not None:
                        all_movimentation = all_movimentation.filter(
                            Movimentations.type == category_enum
                        )
                continue

            all_movimentation = all_movimentation.filter(
                getattr(Movimentations, key) == value
            )

        month = filters_dict.get("month")
        if month is not None:
            all_movimentation = all_movimentation.filter(
                extract("month", Movimentations.movimentation_date) == month
            )

        year = filters_dict.get("year")
        if year is not None:
            all_movimentation = all_movimentation.filter(
                extract("year", Movimentations.movimentation_date) == year
            )

        page = filters_dict.get("page") or 1
        page_size = filters_dict.get("pageSize") or 8

        return (
            all_movimentation.order_by(Movimentations.movimentation_date.desc())
            .offset((page - 1) * page_size)
            .limit(page_size)
            .all()
        )
    

    def get_movimentation_by_id (self, id, user_id):
        existing_movimentation = (
            self.session.query(Movimentations)
            .filter (
                Movimentations.id == id,
                Movimentations.user_id == user_id
            )
            .first()
            )
        return existing_movimentation
    

    def delete_movimentation (self, movimentation):
        self.session.delete(movimentation)
        self.session.commit()
        return {"msg": "movimentation delete successfuly"}
    

    def update_movimentation (self, movimentation, movimentation_db):
        for key, value in movimentation.model_dump().items():
            setattr(movimentation_db, key, value)
        self.session.commit()
        self.session.refresh(movimentation_db)
        return movimentation_db