import { USE_MOCK } from "../config";
import { api, unwrap, withId, delay } from "./api";
import * as seed from "../data/seed";

const NOTIFS_KEY = "somu_notifications_store";

const defaultNotifications = [
  {
    id: "notif-1",
    title: "Order Delivered Successfully",
    message: "Your order #SM1024 has been delivered at your doorstep. Enjoy fresh Somu dairy!",
    time: "2 hours ago",
    unread: true,
    category: "order",
    type: "order",
    icon: "bi-bag-check-fill",
    link: "/track/SM1024",
  },
  {
    id: "notif-2",
    title: "Special Weekend Offer - 15% OFF",
    message: "Get 15% off on all Paneer and Butter orders this weekend with code WEEKEND15.",
    time: "5 hours ago",
    unread: true,
    category: "offer",
    type: "offer",
    icon: "bi-tag-fill",
    link: "/offers",
  },
  {
    id: "notif-3",
    title: "Fresh Morning Milk Dispatch",
    message: "Early morning batch packaging completed at 5:00 AM. Delivering farm fresh milk today.",
    time: "1 day ago",
    unread: false,
    category: "delivery",
    type: "delivery",
    icon: "bi-truck",
    link: "/products",
  },
  {
    id: "notif-4",
    title: "Dairy Subscription Active",
    message: "Your Daily Fresh Cow Milk plan is confirmed. Deliveries resume tomorrow 6:00 AM.",
    time: "2 days ago",
    unread: false,
    category: "subscription",
    type: "subscription",
    icon: "bi-arrow-repeat",
    link: "/account",
  },
];

function readLocalNotifs() {
  try {
    const raw = localStorage.getItem(NOTIFS_KEY);
    if (!raw) {
      localStorage.setItem(NOTIFS_KEY, JSON.stringify(defaultNotifications));
      return defaultNotifications;
    }
    return JSON.parse(raw);
  } catch {
    return defaultNotifications;
  }
}

function writeLocalNotifs(notifs) {
  try {
    localStorage.setItem(NOTIFS_KEY, JSON.stringify(notifs));
    window.dispatchEvent(new CustomEvent("somu:notifications-updated"));
  } catch {}
}

export async function getNotifications() {
  if (USE_MOCK) {
    await delay(150);
    return readLocalNotifs();
  }

  try {
    const remote = unwrap(await api.get("/notifications"));
    if (Array.isArray(remote) && remote.length > 0) {
      return remote.map(withId);
    }
  } catch {}

  return readLocalNotifs();
}

export async function markAsRead(id) {
  const notifs = readLocalNotifs().map((n) =>
    String(n.id) === String(id) ? { ...n, unread: false } : n
  );
  writeLocalNotifs(notifs);

  if (!USE_MOCK) {
    try {
      await api.patch(`/notifications/${id}/read`);
    } catch {}
  }

  return notifs;
}

export async function markAllAsRead() {
  const notifs = readLocalNotifs().map((n) => ({ ...n, unread: false }));
  writeLocalNotifs(notifs);
  return notifs;
}

export function addNotification({ title, message, category = "general", link = "/notifications" }) {
  const icons = {
    order: "bi-bag-check-fill",
    offer: "bi-tag-fill",
    delivery: "bi-truck",
    subscription: "bi-arrow-repeat",
    alert: "bi-exclamation-triangle-fill",
    general: "bi-bell-fill",
  };

  const newNotif = {
    id: "notif-" + Date.now(),
    title,
    message,
    time: "Just now",
    unread: true,
    category,
    type: category,
    icon: icons[category] || icons.general,
    link,
  };

  const list = [newNotif, ...readLocalNotifs()];
  writeLocalNotifs(list);
  return newNotif;
}

// Automated notification triggers
export function triggerOfferNotification(offer) {
  return addNotification({
    title: `New Offer: ${offer.discount} Available!`,
    message: `${offer.title} - Use code "${offer.code}" at checkout: ${offer.description}`,
    category: "offer",
    link: "/offers",
  });
}

export function triggerOrderStatusNotification(orderNumber, status) {
  const messages = {
    Placed: `Your order #${orderNumber} has been placed and received by our farm.`,
    Confirmed: `Order #${orderNumber} is confirmed! Fresh packaging underway.`,
    "Out for Delivery": `Order #${orderNumber} is out for early morning delivery! Chilled van on the way.`,
    Delivered: `Order #${orderNumber} has been delivered at your doorstep. Enjoy pure Somu dairy!`,
    Cancelled: `Order #${orderNumber} has been cancelled.`,
  };

  return addNotification({
    title: `Order #${orderNumber}: ${status}`,
    message: messages[status] || `Your order status has changed to ${status}.`,
    category: "order",
    link: `/track/${orderNumber}`,
  });
}

export function triggerSubscriptionNotification(planName, action) {
  return addNotification({
    title: `Dairy Subscription ${action === "paused" ? "Paused" : "Resumed"}`,
    message: `Your ${planName} deliveries have been ${action}. You can adjust or resume anytime in your account.`,
    category: "subscription",
    link: "/account",
  });
}
