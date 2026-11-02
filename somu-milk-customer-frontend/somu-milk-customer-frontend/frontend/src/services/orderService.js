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

async function syncCartWithBackend(items) {
  // Read the customer's existing backend cart.
  const response = unwrap(await api.get("/cart"));
  const backendCart = response?.cart ?? response;
  const existingItems = backendCart?.items ?? [];

  // Clear existing backend cart items to avoid duplicates.
  for (const item of existingItems) {
    const productId = item.product?._id ?? item.productId ?? item.product;
    if (productId) {
      await api.delete(`/cart/${productId}`);
    }
  }

  // Combine duplicate entries for the same product.
  const grouped = new Map();

  for (const item of items) {
    const productId = String(item._id ?? item.id ?? "");

    if (!/^[a-f\d]{24}$/i.test(productId)) {
      throw new ApiError(
        `Invalid product ID for "${item.name}". Please remove it and add the product again.`,
        400
      );
    }

    const previous = grouped.get(productId) ?? 0;
    grouped.set(productId, previous + Number(item.quantity || 1));
  }

  // Add the current browser cart to the backend cart.
  for (const [productId, quantity] of grouped) {
    await api.post("/cart", { productId, quantity });
  }
}


export async function createOrder(payload) {
  if (USE_MOCK) {
    await delay(500);

    const userId = currentMockUserId();
    if (!userId) {
      throw new ApiError("Please log in to place an order.", 401);
    }

    const order = {
      ...payload,
      userId,
      orderNumber: "SOMU" + Date.now().toString().slice(-8),
      status: "Placed",
      orderDate: new Date().toISOString(),
    };

    localStorage.setItem(
      ORDERS_KEY,
      JSON.stringify([order, ...readOrders()])
    );

    return order;
  }

  await syncCartWithBackend(payload.items ?? []);

  const response = unwrap(
    await api.post("/orders", {
      deliveryAddress: payload.deliveryAddress,
    })
  );

  return response?.order ?? response;
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
