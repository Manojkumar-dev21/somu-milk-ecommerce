// Sample catalogue (same data that used to be typed into Products.jsx).
// The real backend will use this to fill the database.
module.exports = [
  {
    id: 1,
    name: "Fresh Cow Milk",
    category: "Milk Products",
    image: "milk",
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
    image: "milk",
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
    image: "milk",
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
    image: "curd",
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
    image: "curd",
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
    image: "curd",
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
    image: "butter",
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
    image: "butter",
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
    image: "ghee",
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
    image: "paneer",
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
    image: "paneer",
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
    image: "icecream",
    description:
      "Creamy and delicious milk ice cream made for a refreshing family treat.",
    sizes: [
      { size: "100 ml", price: 40 },
      { size: "500 ml", price: 160 },
      { size: "1 L", price: 280 },
    ],
  },
];
