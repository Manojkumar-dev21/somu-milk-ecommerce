# Somu Milk Admin — Connected Frontend Update

## What changed
- Refined the admin palette with a forest-green navigation sidebar and lighter work area.
- Added restrained visual distinctions for inventory, orders, customers, subscriptions and finance.
- Added a **View customer website** link in the admin sidebar to navigate back to `/`.
- Admin and customer routes live in the same React + Vite app, so you can switch between the storefront and admin without running a second frontend.
- Admin routes are temporarily unprotected for local development only.

## Run
From `frontend`:
```bash
npm install
npm run dev
```
Open `/admin/dashboard` for admin and `/` for the customer storefront.

## Before deployment
The route bypass is for local development only. Restore server-backed admin authentication before publishing. This is a frontend design/navigation update; it does not yet make admin product changes appear in the customer catalogue or connect orders to a database. That requires shared Spring Boot APIs and MySQL persistence.
