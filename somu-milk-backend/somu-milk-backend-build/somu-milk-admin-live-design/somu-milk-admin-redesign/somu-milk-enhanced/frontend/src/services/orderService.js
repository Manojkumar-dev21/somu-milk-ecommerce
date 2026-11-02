import { USE_MOCK } from "../config";
import { api, tokenStore, ApiError, unwrap, delay } from "./api";

/*
  BACKEND ENDPOINTS (login needed)
    POST /orders              -> create an order, returns the saved order
    GET  /orders/mine         -> orders of the logged-in customer
    GET  /orders/:orderNumber -> one order

  IMPORTANT FOR THE BACKEND: never trust prices or totals sent by the
  browser. Look the products up in the database and calculate
  subtotal, delivery charge and total on the server.

  order = {
    orderNumber, status, orderDate, mobile, customer, items,
    subtotal, deliveryCharge, total, deliverySlot, paymentMethod
  }
*/

const ORDERS_KEY = "somu_mock_orders";

function readOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}

const currentMockUserId = () => {
  const token = tokenStore.get();
  return token && token.startsWith("mock.") ? token.slice(5) : null;
};

export async function createOrder(payload) {
  if (USE_MOCK) {
    await delay(500);

    const userId = currentMockUserId();
    if (!userId) throw new ApiError("Please log in to place an order.", 401);

    const order = {
      ...payload,
      userId,
      orderNumber: "SOMU" + Date.now().toString().slice(-8),
      status: "Placed",
      orderDate: new Date().toISOString(),
    };

    localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...readOrders()]));
    return order;
  }

  return api.post("/orders", payload);
}

export async function getMyOrders() {
  if (USE_MOCK) {
    await delay();
    const userId = currentMockUserId();
    return readOrders().filter((order) => order.userId === userId);
  }

  return unwrap(await api.get("/orders/mine"));
}

export async function getOrder(orderNumber) {
  if (USE_MOCK) {
    await delay();
    const userId = currentMockUserId();
    return (
      readOrders().find(
        (order) => order.orderNumber === orderNumber && order.userId === userId
      ) || null
    );
  }

  return api.get(`/orders/${encodeURIComponent(orderNumber)}`);
}
