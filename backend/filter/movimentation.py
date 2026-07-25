from dataclasses import dataclass
from typing import Any


@dataclass
class MovimentationFilter:
    search: str | None = None
    category: str | None = None
    type: str | None = None
    month: int | None = None
    year: int | None = None
    page: int | None = None
    pageSize: int | None = None


def normalize_movimentation_filters(raw_params: dict[str, Any]) -> MovimentationFilter:
    def parse_int(value: Any, default: int | None = None) -> int | None:
        if value is None:
            return default
        if isinstance(value, str):
            value = value.strip()
            if value == "":
                return default
        return int(value)

    return MovimentationFilter(
        search=(raw_params.get("search") or None),
        category=(raw_params.get("category") or None),
        type=(raw_params.get("type") or None),
        month=parse_int(raw_params.get("month")),
        year=parse_int(raw_params.get("year")),
        page=parse_int(raw_params.get("page"), default=1),
        pageSize=parse_int(raw_params.get("pageSize"), default=8),
    )
