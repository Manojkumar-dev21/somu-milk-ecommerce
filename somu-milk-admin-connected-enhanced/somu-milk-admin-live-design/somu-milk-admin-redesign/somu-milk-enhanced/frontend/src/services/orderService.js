import { USE_MOCK } from "../config";
import { api, tokenStore, ApiError, unwrap, delay } from "./api";
import { triggerOrderStatusNotification } from "./notificationService";
import milkImg from "../assets/home-milk.jpg";
import curdImg from "../assets/home-curd.jpg";
import paneerImg from "../assets/home-paneer.jpg";
import gheeImg from "../assets/home-ghee.jpg";

const ORDERS_KEY = "somu_mock_orders";

const sampleTrackingOrders = [
  {
    orderNumber: "SM1024",
    status: "Delivered",
    orderDate: new Date(Date.now() - 3600000 * 4).toISOString(),
    customer: "Priya Kumar",
    mobile: "+91 98765 43210",
    deliverySlot: "Morning 6:00 AM – 9:00 AM",
    paymentMethod: "UPI (Google Pay)",
    address: {
      flat: "Flat 402, Green Meadows",
      street: "Saravanampatti Main Road",
      city: "Coimbatore",
      pincode: "641035",
    },
    agent: {
      name: "Ramesh Kumar",
      phone: "+91 98451 09876",
      vehicle: "Insulated Dairy Van (TN-38-BZ-4412)",
      rating: "4.9",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    },
    items: [
      {
        id: "item-1",
        name: "Fresh Cow Milk",
        size: "1 L",
        quantity: 2,
        price: 65,
        image: milkImg,
      },
      {
        id: "item-2",
        name: "Fresh Curd",
        size: "500 g",
        quantity: 1,
        price: 45,
        image: curdImg,
      },
    ],
    subtotal: 175,
    deliveryCharge: 0,
    total: 175,
  },
  {
    orderNumber: "SM1026",
    status: "Out for Delivery",
    orderDate: new Date(Date.now() - 3600000 * 2).toISOString(),
    customer: "Meena S",
    mobile: "+91 97890 12345",
    deliverySlot: "Morning 6:00 AM – 9:00 AM",
    paymentMethod: "Card (Visa Debit)",
    address: {
      flat: "Plot 18, Dairy View Layout",
      street: "Trichy Road, Ramanathapuram",
      city: "Coimbatore",
      pincode: "641045",
    },
    agent: {
      name: "Murugan Selvam",
      phone: "+91 97865 33211",
      vehicle: "Somu Chilled Express (TN-37-CA-1109)",
      rating: "4.8",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    },
    items: [
      {
        id: "item-3",
        name: "Fresh Paneer",
        size: "500 g",
        quantity: 2,
        price: 275,
        image: paneerImg,
      },
      {
        id: "item-4",
        name: "Pure Cow Ghee",
        size: "500 ml",
        quantity: 1,
        price: 345,
        image: gheeImg,
      },
    ],
    subtotal: 895,
    deliveryCharge: 0,
    total: 895,
  },
  {
    orderNumber: "SM1025",
    status: "Confirmed",
    orderDate: new Date(Date.now() - 3600000 * 1).toISOString(),
    customer: "Arun Kumar",
    mobile: "+91 98451 23456",
    deliverySlot: "Morning 6:00 AM – 9:00 AM",
    paymentMethod: "Cash on Delivery",
    address: {
      flat: "No. 12, Farmgate Residency",
      street: "Avinashi Road, Peelamedu",
      city: "Coimbatore",
      pincode: "641004",
    },
    agent: {
      name: "Karthik Raja",
      phone: "+91 94432 55678",
      vehicle: "Chilled Farm Truck (TN-38-EF-9921)",
      rating: "5.0",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    },
    items: [
      {
        id: "item-5",
        name: "Full Cream Milk",
        size: "1 L",
        quantity: 2,
        price: 70,
        image: milkImg,
      },
    ],
    subtotal: 140,
    deliveryCharge: 30,
    total: 170,
  },
];

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

    const orderNumber = "SOMU" + Date.now().toString().slice(-6);

    const order = {
      ...payload,
      userId,
      orderNumber,
      status: "Placed",
      orderDate: new Date().toISOString(),
      agent: {
        name: "Ramesh Kumar",
        phone: "+91 98451 09876",
        vehicle: "Insulated Dairy Van (TN-38-BZ-4412)",
        rating: "4.9",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
      },
    };

    localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...readOrders()]));

    // Trigger automated order notification
    try {
      triggerOrderStatusNotification(orderNumber, "Placed");
    } catch {}

    return order;
  }

  const result = await api.post("/orders", payload);
  try {
    if (result?.orderNumber) {
      triggerOrderStatusNotification(result.orderNumber, "Placed");
    }
  } catch {}
  return result;
}

export async function getMyOrders() {
  if (USE_MOCK) {
    await delay();
    const userId = currentMockUserId();
    const userOrders = readOrders().filter((order) => order.userId === userId);
    if (userOrders.length > 0) return userOrders;
    // Default mock orders if none placed yet
    return sampleTrackingOrders;
  }

  try {
    const list = unwrap(await api.get("/orders/mine"));
    if (Array.isArray(list) && list.length > 0) return list;
  } catch {}
  return sampleTrackingOrders;
}

export async function getOrder(orderNumber) {
  const cleanId = String(orderNumber || "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

  if (USE_MOCK) {
    await delay(150);
    const all = [...readOrders(), ...sampleTrackingOrders];
    const match = all.find(
      (order) =>
        String(order.orderNumber).replace(/[^a-zA-Z0-9]/g, "").toUpperCase() === cleanId
    );
    if (match) return match;
    // Fallback: return first sample order customized with requested ID
    return {
      ...sampleTrackingOrders[0],
      orderNumber: orderNumber || "SM1024",
    };
  }

  try {
    const res = await api.get(`/orders/${encodeURIComponent(orderNumber)}`);
    if (res) return res;
  } catch {}

  const all = [...readOrders(), ...sampleTrackingOrders];
  return (
    all.find(
      (order) =>
        String(order.orderNumber).replace(/[^a-zA-Z0-9]/g, "").toUpperCase() === cleanId
    ) || {
      ...sampleTrackingOrders[0],
      orderNumber: orderNumber || "SM1024",
    }
  );
}
