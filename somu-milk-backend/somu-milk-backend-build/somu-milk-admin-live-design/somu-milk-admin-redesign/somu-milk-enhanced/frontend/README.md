# Somu Milk Products — Frontend

A React + Vite customer and admin frontend for the Somu Milk Products e-commerce project.

## Included

### Customer
- Home page and category browsing
- Product listing and product details
- Cart, checkout, and order success pages
- Login and registration
- Account, notifications, offers, and About/Contact pages

### Admin
- Dashboard
- Product management
- Order management
- Customer management
- Subscription management
- Sales and profit overview

The project includes a shared visual theme, responsive styling, local demo data, and an API service layer.

## Requirements

- Node.js compatible with the Vite version in `package.json`
- npm

## Run locally

1. Extract the ZIP.
2. Open the `frontend` folder in VS Code.
3. Open a terminal in that folder.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL printed by Vite, usually `http://localhost:5173`.

## Demo mode and backend

The app is configured to run in demo mode by default so the UI can be reviewed without a backend.

Copy `.env.example` to `.env` if needed and configure:

```env
VITE_API_URL=http://localhost:8081/api
VITE_USE_MOCK=true
```

- `VITE_USE_MOCK=true`: use local demo data where supported.
- `VITE_USE_MOCK=false`: call the backend at `VITE_API_URL`.

**Important:** changing the API URL does not create or connect a backend by itself. The Spring Boot endpoints, payloads, authentication, and CORS settings must match the frontend services before switching demo mode off.

## Useful commands

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Current project status

This ZIP contains the frontend only. It does not include a Spring Boot backend or MySQL database. Demo-mode actions may use browser storage and should not be treated as production persistence. Payment methods shown in the UI do not represent a real payment gateway unless one is separately integrated.
