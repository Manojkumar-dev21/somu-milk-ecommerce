# Frontend — real-use update

## How it runs
- `.env` has `VITE_USE_MOCK=true`  -> DEMO mode: works with no backend (data stays in the browser only).
- When the Node.js backend is ready, set `VITE_USE_MOCK=false` and `VITE_API_URL=http://localhost:5000/api`, then restart `npm run dev`.
- Demo admin login: `admin@somu.local` / `Admin@123` (demo mode only — not secure).

## What is connected to the API layer (`src/services`)
Register, Login, logged-in user, saved address, Products, Product Details, Offers, Notifications, Checkout (create order), Order Success.
Checkout, Account, Order Success, Notifications and all Admin routes now need login (Admin needs the admin role).

## Backend endpoints the frontend expects
POST /auth/register, POST /auth/login, GET /auth/me, PUT /users/me/address,
GET /products, GET /products/:id, GET /offers, GET /notifications,
POST /orders, GET /orders/mine, GET /orders/:orderNumber
(Details are written at the top of each file in `src/services`.)
The server must calculate prices/totals itself and never trust the browser.

## Still to do
- Admin pages (Dashboard, Products, Orders, Customers, Subscriptions, Sales) still show typed-in sample data — they connect once the backend exists.
- Replace `+91 xxxxxxxxxx` in Footer.jsx and About.jsx with the real phone number.
- Payments: only Cash on Delivery today.

## Fixed in this pass
- After placing an order, the customer was sent to Products instead of the confirmation page.
- Cart page said "order without logging in" although checkout needs login.
- Mobile number was missing on the order confirmation page.
