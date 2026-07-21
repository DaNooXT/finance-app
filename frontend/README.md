# Finovo — Sistema de Controle Financeiro Pessoal

React 19 + Vite + JavaScript + React Router DOM + Axios + Bootstrap 5 + Recharts.

## Rodando localmente

```bash
npm install
npm run dev
```

O app abre em modo mock (dados fictícios em memória) — login aceita qualquer
email + senha com 4+ caracteres.

## Conectando sua API FastAPI

1. Copie `.env.example` para `.env` e ajuste `VITE_API_URL` para a URL da sua API.
2. Defina `VITE_USE_MOCK=false`.
3. Cada arquivo em `src/services/` (AuthService, DashboardService,
   MovimentationService) já contém a chamada Axios real comentada com
   `// ---- Substituir pela chamada real ----`, esperando os seguintes
   endpoints:
   - `POST /login`
   - `POST /register`
   - `GET /dashboard/month?year=&month=`
   - `GET /dashboard/year?year=`
   - `GET /movimentations?year=&month=&category=&type=&search=&page=&pageSize=`
   - `POST /movimentations`
   - `PUT /movimentations/:id`
   - `DELETE /movimentations/:id`

O token JWT é salvo em `localStorage` e enviado automaticamente como
`Authorization: Bearer <token>` em toda requisição (ver `src/services/api.js`).

## Build de produção

```bash
npm run build
```
