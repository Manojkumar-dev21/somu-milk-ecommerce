# Somu Milk — Customer Frontend

This ZIP contains the customer-facing React + Vite frontend in one project folder.

## Customer pages included
- Home
- Product catalogue
- Product details
- Cart
- Checkout
- Order success
- Offers
- About
- Login
- Registration
- Account/profile
- Notifications

It also includes shared navigation, footer, styling, assets, cart/auth context, and API service files used by those pages.

## Run locally
1. Extract this ZIP.
2. Open the `frontend` folder in VS Code.
3. Open the terminal in that folder.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the local URL printed by Vite.

## Important for a real e-commerce website
This is the customer frontend, not the complete production system. A real service requires the Spring Boot backend and MySQL database to be implemented, connected, and tested. Before launch, the backend must persist customers and orders, validate prices and stock, enforce authorization, validate delivery PIN codes, and securely integrate online UPI payments. Do not accept real payments until a payment provider integration and server-side payment verification are complete.

Check `.env.example` for the frontend API URL configuration. Changing that URL alone does not create a backend. Existing demo/mock behavior must be reviewed and disabled or replaced where necessary before production.
