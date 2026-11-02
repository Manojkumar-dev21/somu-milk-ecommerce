# Somu Milk Admin Frontend

This project includes the customer frontend and a separate admin interface. The admin uses a compact forest-green sidebar, simple navigation, and restrained accent colors for products, orders, customers, subscriptions, and sales.

## Run
1. Open the `frontend` folder in VS Code.
2. Run `npm install`.
3. Run `npm run dev`.
4. Sign in with an account that the current authentication logic recognizes as an admin, then open `/admin/dashboard`. No default admin credentials are assumed.

## Admin sections
- Dashboard
- Products and stock
- Orders
- Customers
- Subscriptions
- Sales & Profit

## Real-use status
This is the frontend layer. Some data/actions are still demo-based. Connect and test the Spring Boot APIs and MySQL persistence before real business use. Admin authorization must be enforced by the backend. Online UPI must use a payment provider and server-side payment verification before accepting real payments.
