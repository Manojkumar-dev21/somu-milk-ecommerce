# Somu Milk Backend (Spring Boot + MySQL)

This backend starter adds persistent product and order APIs for the Somu Milk frontend.

## Stack
- Java 17
- Spring Boot 3.4
- Spring Web, Validation, Spring Data JPA
- MySQL 8.4
- Maven

## Start MySQL
Option A — Docker:
```bash
docker compose up -d mysql
```
Set `DB_PASSWORD` to the same value as `docker-compose.yml` uses, or change both.

Option B — local MySQL:
Create a database named `somu_milk`, then configure `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD`.

## Run backend
From this `backend` folder:
```bash
mvn spring-boot:run
```
Health check: `http://localhost:8081/api/health`

## API endpoints
- `GET /api/products` — active catalogue
- `GET /api/products/{id}` — product detail
- `POST /api/products` — create product (currently development-only, not secured)
- `PUT /api/products/{id}` — update product (currently development-only, not secured)
- `DELETE /api/products/{id}` — soft-deactivate product (currently development-only, not secured)
- `POST /api/orders` — create order; price is taken from DB, stock checked and decremented transactionally
- `GET /api/orders` — list all orders (currently development-only, not secured)
- `PATCH /api/orders/{id}/status?status=CONFIRMED` — update order status (currently development-only, not secured)
- `GET /api/delivery/check?pinCode=620001` — sample PIN allowlist
- `GET /api/payments/methods` — describes available payment methods; UPI is deliberately disabled until a provider is configured

## Frontend connection
In `frontend/.env` set:
```env
VITE_API_URL=http://localhost:8081/api
VITE_USE_MOCK=false
```
Restart Vite after changing `.env`.

**Important:** the frontend service payloads and response shapes must be checked and adapted to these APIs. The backend ZIP includes the full frontend project for convenience, but does not mean every page is integrated end-to-end.

## Not production-ready yet
Before a public launch:
1. Add server-side authentication/authorization (e.g. Spring Security + signed JWT/session) and protect product mutations and all admin order/customer endpoints.
2. Replace sample PIN codes with Somu Milk's actual delivery areas and validate every order against the allowlist.
3. Integrate a payment gateway for UPI and verify payment status server-side via signed webhooks; never trust a frontend payment-success flag.
4. Add customer accounts, order ownership checks, rate limiting, audit logs, proper error handling and database backups.
5. Replace `ddl-auto=update` with versioned migrations and run integration/security tests.
6. Run Maven tests/build and full customer-to-admin end-to-end tests before launch.

This is a development starter, not a finished production payment/authentication system.
