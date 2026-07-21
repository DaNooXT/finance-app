from datetime import timedelta, timezone, datetime
from jose import jwt   
from core.config import ACCESS_TOKEN_EXPIRE, SECRET_KEY, ALGORITHM

def create_token (data, expire = timedelta(ACCESS_TOKEN_EXPIRE)):
    expiration_time = datetime.now(timezone.utc) + expire

    data_token = {
        "sub": str(data),
        "exp": expiration_time
    }

    token = jwt.encode(data_token, SECRET_KEY, algorithm=ALGORITHM)

    return token