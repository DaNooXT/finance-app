# Raul's App

<div align="center">

![FastAPI + React](https://img.shields.io/badge/Stack-FastAPI%20%2B%20React-blue)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-316192)
![JWT Auth](https://img.shields.io/badge/Auth-JWT-ffb703)

Finance management application for personal budgeting, dashboard, filters and movement records.

</div>

## Overview

Finova App is a full-stack financial control application that helps users create, review and analyze income and expense records throughout the year.

Main capabilities:

- User registration and authentication with JWT.
- CRUD for financial movements.
- Monthly and yearly dashboard summaries.
- Expense category distribution and financial indicators.
- Search and filter records by description, category, type and date.
- React + Vite interface for modern web experience.

## Technology Stack

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- PostgreSQL
- Alembic
- JWT using python-jose

### Frontend

- React 19
- Vite
- React Router DOM
- Recharts
- Bootstrap Icons
- Axios

## Project Structure

```text
finance-app/
├── backend/
│   ├── alembic/
│   ├── core/
│   ├── database/
│   ├── filter/
│   ├── repositories/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Requirements

Before running the application, make sure you have:

- Python 3.11+
- Node.js 20+
- npm
- PostgreSQL
- Git

## Backend Setup

1. Go to backend directory:

```bash
cd backend
```

2. Create and activate a virtual environment:

```bash
python -m venv .venv
.venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create a backend/.env file with the required environment variables:

```env
SECRET_KEY=sua_chave_secreta
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE=30
DATABASE_URL=postgresql+psycopg2://usuario:senha@localhost:5432/Finance_app
```

5. Apply migrations:

```bash
alembic upgrade head
```

6. Start the API:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: http://127.0.0.1:8000

## Frontend Setup

1. Go to frontend directory:

```bash
cd frontend
```

2. Install JavaScript dependencies:

```bash
npm install
```

3. Create a frontend/.env file:

```env
VITE_API_URL=http://127.0.0.1:8000
VITE_USE_MOCK=false
```

4. Start the development server:

```bash
npm run dev
```

The web interface will be available at: http://127.0.0.1:5173

## Main API Endpoints

### Authentication

- POST /auth/register
- POST /auth/login
- POST /auth/refresh
- POST /auth/login-form
- DELETE /auth/{id}

### Movements

- POST /movimentation
- GET /movimentation
- PUT /movimentation/{id}
- DELETE /movimentation/{id}

Movement objects include:

- amount
- description
- type
- movimentation_type
- movimentation_date

### Dashboard

- GET /dashboard/month
- GET /dashboard

## Usage Flow

1. Register an account.
2. Log in with your account.
3. Add income and expense movements.
4. Filter the movement history.
5. Review monthly and yearly dashboards.

## Useful Commands

### Backend

```bash
cd backend
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm run dev
npm run build
npm run lint
```

## Production Build

```bash
cd frontend
npm run build
```

## License

This project is distributed under the license defined in the file [LICENSE](LICENSE).
