/* =========================================================
   DEMO / SEED DATA

   Used ONLY when the app runs in demo mode (VITE_USE_MOCK=true).
   When the real backend is connected (VITE_USE_MOCK=false) none
   of this file is used - everything comes from the server.
========================================================= */

import milkImg from "../assets/home-milk.jpg";
import curdImg from "../assets/home-curd.jpg";
import butterImg from "../assets/home-butter.jpg";
import paneerImg from "../assets/home-paneer.jpg";
import gheeImg from "../assets/home-ghee.jpg";
import icecreamImg from "../assets/home-icecream.jpg";

import featureMilk from "../assets/feature-milk.jpg";
import featureCurd from "../assets/feature-curd.jpg";
import featureButter from "../assets/feature-butter.jpg";
import featurePaneer from "../assets/feature-paneer.jpg";

import person1 from "../assets/feedback-person1.jpg";
import person2 from "../assets/feedback-person2.jpg";
import person3 from "../assets/feedback-person3.jpg";

/* ---------- PRODUCTS ---------- */

export const products = [
  {
    id: 1,
    name: "Fresh Cow Milk",
    category: "Milk Products",
    image: milkImg,
    description:
      "Fresh farm milk collected daily and delivered with natural taste and goodness.",
    sizes: [
      { size: "500 ml", price: 35 },
      { size: "1 L", price: 65 },
      { size: "2 L", price: 125 },
    ],
  },

  {
    id: 2,
    name: "Full Cream Milk",
    category: "Milk Products",
    image: milkImg,
    description:
      "Rich and creamy full cream milk suitable for tea, coffee, cooking and daily use.",
    sizes: [
      { size: "500 ml", price: 38 },
      { size: "1 L", price: 70 },
      { size: "2 L", price: 135 },
    ],
  },

  {
    id: 3,
    name: "Flavored Milk",
    category: "Milk Products",
    image: milkImg,
    description:
      "Refreshing flavored milk made with quality dairy ingredients for a delicious drink.",
    sizes: [
      { size: "200 ml", price: 25 },
      { size: "500 ml", price: 55 },
      { size: "1 L", price: 100 },
    ],
  },

  {
    id: 4,
    name: "Fresh Curd",
    category: "Fermented Products",
    image: curdImg,
    description:
      "Fresh and creamy curd prepared from quality milk with a smooth texture.",
    sizes: [
      { size: "200 g", price: 20 },
      { size: "500 g", price: 45 },
      { size: "1 kg", price: 80 },
    ],
  },

  {
    id: 5,
    name: "Buttermilk",
    category: "Fermented Products",
    image: curdImg,
    description:
      "Light and refreshing buttermilk, perfect for staying cool and refreshed.",
    sizes: [
      { size: "200 ml", price: 12 },
      { size: "500 ml", price: 25 },
      { size: "1 L", price: 40 },
    ],
  },

  {
    id: 6,
    name: "Fresh Lassi",
    category: "Fermented Products",
    image: curdImg,
    description:
      "Creamy and refreshing lassi prepared from fresh curd for a delicious dairy drink.",
    sizes: [
      { size: "200 ml", price: 25 },
      { size: "500 ml", price: 55 },
      { size: "1 L", price: 100 },
    ],
  },

  {
    id: 7,
    name: "Salted Butter",
    category: "Fat-Based Products",
    image: butterImg,
    description:
      "Smooth and creamy salted butter made from fresh milk with a rich dairy taste.",
    sizes: [
      { size: "100 g", price: 60 },
      { size: "250 g", price: 140 },
      { size: "500 g", price: 275 },
    ],
  },

  {
    id: 8,
    name: "Fresh Cream",
    category: "Fat-Based Products",
    image: butterImg,
    description:
      "Fresh dairy cream ideal for desserts, cooking, baking and creamy recipes.",
    sizes: [
      { size: "100 ml", price: 50 },
      { size: "200 ml", price: 90 },
      { size: "500 ml", price: 210 },
    ],
  },

  {
    id: 9,
    name: "Pure Cow Ghee",
    category: "Fat-Based Products",
    image: gheeImg,
    description:
      "Pure aromatic cow ghee prepared with care for cooking and traditional recipes.",
    sizes: [
      { size: "100 ml", price: 80 },
      { size: "500 ml", price: 345 },
      { size: "1 L", price: 660 },
    ],
  },

  {
    id: 10,
    name: "Fresh Paneer",
    category: "Others",
    image: paneerImg,
    description:
      "Soft and fresh paneer prepared from quality milk, perfect for everyday cooking.",
    sizes: [
      { size: "200 g", price: 110 },
      { size: "500 g", price: 275 },
      { size: "1 kg", price: 550 },
    ],
  },

  {
    id: 11,
    name: "Processed Cheese",
    category: "Others",
    image: paneerImg,
    description:
      "Creamy and delicious cheese suitable for sandwiches, cooking and snacks.",
    sizes: [
      { size: "100 g", price: 70 },
      { size: "200 g", price: 130 },
      { size: "500 g", price: 300 },
    ],
  },

  {
    id: 12,
    name: "Milk Ice Cream",
    category: "Others",
    image: icecreamImg,
    description:
      "Creamy and delicious milk ice cream made for a refreshing family treat.",
    sizes: [
      { size: "100 ml", price: 40 },
      { size: "500 ml", price: 160 },
      { size: "1 L", price: 280 },
    ],
  },
];

/* ---------- POPULAR PRODUCTS (home page) ---------- */

export const popularProducts = [
  {
    id: 1,
    name: "Fresh Cow Milk",
    image: featureMilk,
    price: "\u20b965",
    quantity: "1 L",
    description: "Fresh milk for your everyday needs.",
  },
  {
    id: 2,
    name: "Fresh Curd",
    image: featureCurd,
    price: "\u20b950",
    quantity: "500 g",
    description: "Thick and fresh curd for everyday meals.",
  },
  {
    id: 3,
    name: "Salted Butter",
    image: featureButter,
    price: "\u20b960",
    quantity: "100 g",
    description: "Creamy butter made from quality dairy.",
  },
  {
    id: 4,
    name: "Fresh Paneer",
    image: featurePaneer,
    price: "\u20b9120",
    quantity: "200 g",
    description: "Soft and fresh paneer for your favourite dishes.",
  },
];

/* ---------- OFFERS ---------- */

export const offers = [
  {
    id: 1,
    title: "Fresh Milk Special",
    image: featureMilk,
    description: "Enjoy fresh and quality cow milk for your everyday needs.",
    oldPrice: "\u20b970",
    price: "\u20b965",
    quantity: "1 L",
    badge: "Fresh Deal",
  },
  {
    id: 2,
    title: "Fresh Curd Offer",
    image: featureCurd,
    description: "Thick and creamy fresh curd made from quality milk.",
    oldPrice: "\u20b960",
    price: "\u20b950",
    quantity: "500 g",
    badge: "10% OFF",
  },
  {
    id: 3,
    title: "Butter Special",
    image: featureButter,
    description: "Creamy and delicious butter for your everyday meals.",
    oldPrice: "\u20b970",
    price: "\u20b960",
    quantity: "100 g",
    badge: "Special Price",
  },
  {
    id: 4,
    title: "Fresh Paneer Deal",
    image: featurePaneer,
    description: "Soft and fresh paneer made from quality milk.",
    oldPrice: "\u20b9140",
    price: "\u20b9120",
    quantity: "200 g",
    badge: "Best Deal",
  },
];

/* ---------- REVIEWS ---------- */

export const reviews = [
  {
    id: 1,
    name: "Priya",
    image: person1,
    message:
      "The milk is fresh and the delivery experience has been very convenient.",
  },
  {
    id: 2,
    name: "Arun",
    image: person2,
    message:
      "I like the quality of the dairy products and the easy ordering process.",
  },
  {
    id: 3,
    name: "Kavya",
    image: person3,
    message:
      "Regular milk delivery makes it easy to manage our everyday dairy needs.",
  },
];

/* ---------- NOTIFICATIONS (demo only) ---------- */

export const notifications = [
  {
    id: 1,
    icon: "bi-box-seam",
    title: "Order Delivered",
    message: "Your recent dairy order has been delivered successfully.",
    time: "Today",
    type: "order",
    unread: true,
  },
  {
    id: 2,
    icon: "bi-truck",
    title: "Delivery Update",
    message: "Your order is out for delivery. Please keep your phone available.",
    time: "Yesterday",
    type: "delivery",
    unread: true,
  },
  {
    id: 3,
    icon: "bi-gift",
    title: "New Offer Available",
    message: "Check out the latest offers and special deals on dairy products.",
    time: "2 days ago",
    type: "offer",
    unread: false,
  },
  {
    id: 4,
    icon: "bi-calendar-check",
    title: "Dairy Plan Reminder",
    message: "Your regular dairy delivery is scheduled for tomorrow.",
    time: "3 days ago",
    type: "plan",
    unread: false,
  },
];
