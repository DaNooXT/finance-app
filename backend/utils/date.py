from datetime import datetime

def get_current_month ():
    today = datetime.now()

    initial = datetime(today.year, today.month, 1)

    if today.month == 12:
        end = datetime(today.year + 1, 1, 1)
    else:
        end = datetime(today.year, today.month + 1, 1)

    return initial, end