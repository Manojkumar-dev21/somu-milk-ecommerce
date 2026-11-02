const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const DB_FILE = path.join(__dirname, "..", "data", "somu_milk_db.json");

// Default seed data
const initialData = {
  admins: [
    {
      id: "admin-1",
      _id: "admin-1",
      name: "Somu Admin",
      email: "admin@somu.local",
      // Password: Admin@123
      password: "$2a$12$KkQo2g16/lS6z8aK9Hl7jOPfQ064q2v.C0yvIgej6oE3uRsq1v6c6",
      role: "admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  customers: [
    {
      id: "cust-1",
      _id: "cust-1",
      name: "Priya Kumar",
      email: "priya@example.com",
      phone: "9876543210",
      // Password: Password@123
      password: "$2a$12$e6mZz50PkWFkZ6P2R9Y6GuvqC3V8Kq1E6R5V8Kq1E6R5V8Kq1E6R.",
      role: "customer",
      address: "12, Anna Nagar 2nd Street, Trichy - 620001",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  products: [
    {
      id: 1,
      _id: "prod-1",
      name: "Fresh Cow Milk",
      category: "Milk Products",
      image: "/src/assets/home-milk.jpg",
      description: "Fresh farm milk collected daily and delivered with natural taste and goodness.",
      stock: 65,
      isAvailable: true,
      sizes: [
        { size: "500 ml", price: 35 },
        { size: "1 L", price: 65 },
        { size: "2 L", price: 125 },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      _id: "prod-2",
      name: "Full Cream Milk",
      category: "Milk Products",
      image: "/src/assets/home-milk.jpg",
      description: "Rich and creamy full cream milk suitable for tea, coffee, cooking and daily use.",
      stock: 40,
      isAvailable: true,
      sizes: [
        { size: "500 ml", price: 38 },
        { size: "1 L", price: 70 },
        { size: "2 L", price: 135 },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      _id: "prod-3",
      name: "Flavored Milk",
      category: "Milk Products",
      image: "/src/assets/home-milk.jpg",
      description: "Refreshing flavored milk made with quality dairy ingredients for a delicious drink.",
      stock: 25,
      isAvailable: true,
      sizes: [
        { size: "200 ml", price: 25 },
        { size: "500 ml", price: 55 },
        { size: "1 L", price: 100 },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 4,
      _id: "prod-4",
      name: "Fresh Curd",
      category: "Fermented Products",
      image: "/src/assets/home-curd.jpg",
      description: "Fresh and creamy curd prepared from quality milk with a smooth texture.",
      stock: 35,
      isAvailable: true,
      sizes: [
        { size: "200 g", price: 20 },
        { size: "500 g", price: 45 },
        { size: "1 kg", price: 80 },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 5,
      _id: "prod-5",
      name: "Buttermilk",
      category: "Fermented Products",
      image: "/src/assets/home-curd.jpg",
      description: "Light and refreshing buttermilk, perfect for staying cool and refreshed.",
      stock: 50,
      isAvailable: true,
      sizes: [
        { size: "200 ml", price: 12 },
        { size: "500 ml", price: 25 },
        { size: "1 L", price: 40 },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 6,
      _id: "prod-6",
      name: "Fresh Lassi",
      category: "Fermented Products",
      image: "/src/assets/home-curd.jpg",
      description: "Creamy and refreshing lassi prepared from fresh curd for a delicious dairy drink.",
      stock: 20,
      isAvailable: true,
      sizes: [
        { size: "200 ml", price: 25 },
        { size: "500 ml", price: 55 },
        { size: "1 L", price: 100 },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 7,
      _id: "prod-7",
      name: "Salted Butter",
      category: "Fat-Based Products",
      image: "/src/assets/home-butter.jpg",
      description: "Smooth and creamy salted butter made from fresh milk with a rich dairy taste.",
      stock: 30,
      isAvailable: true,
      sizes: [
        { size: "100 g", price: 60 },
        { size: "250 g", price: 140 },
        { size: "500 g", price: 275 },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 8,
      _id: "prod-8",
      name: "Pure Cow Ghee",
      category: "Fat-Based Products",
      image: "/src/assets/home-ghee.jpg",
      description: "Pure aromatic cow ghee prepared with care for cooking and traditional recipes.",
      stock: 45,
      isAvailable: true,
      sizes: [
        { size: "100 ml", price: 80 },
        { size: "500 ml", price: 345 },
        { size: "1 L", price: 660 },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 9,
      _id: "prod-9",
      name: "Fresh Paneer",
      category: "Others",
      image: "/src/assets/home-paneer.jpg",
      description: "Soft and fresh paneer prepared from quality milk, perfect for everyday cooking.",
      stock: 28,
      isAvailable: true,
      sizes: [
        { size: "200 g", price: 110 },
        { size: "500 g", price: 275 },
        { size: "1 kg", price: 550 },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  offers: [
    {
      id: 1,
      title: "First Order Discount",
      description: "Enjoy 10% off on your first dairy order above ₹200.",
      code: "FRESH10",
      discount: "10% OFF",
      badge: "Welcome Offer",
      validTill: "31 Dec 2026",
    },
    {
      id: 2,
      title: "Monthly Milk Subscription",
      description: "Subscribe for 30 days and get 2 days complimentary milk delivery.",
      code: "MONTHLY30",
      discount: "2 Days Free",
      badge: "Subscription",
      validTill: "Ongoing",
    },
    {
      id: 3,
      title: "Free Delivery",
      description: "Free early-morning delivery on all orders above ₹199.",
      code: "FREEDEL",
      discount: "Free Shipping",
      badge: "Popular",
      validTill: "All Days",
    },
  ],
  reviews: [
    {
      id: 1,
      name: "Kavitha R.",
      rating: 5,
      comment: "Prompt 6:00 AM delivery daily! Milk is pure, fresh and children love the taste.",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Suresh Narayanan",
      rating: 5,
      comment: "Best Paneer in town. Soft, fresh and natural without preservatives.",
      date: "1 week ago",
    },
    {
      id: 3,
      name: "Anand M.",
      rating: 5,
      comment: "The pure cow ghee aroma reminds me of village farm fresh ghee. Superb quality!",
      date: "2 weeks ago",
    },
  ],
  orders: [
    {
      id: "ord-1",
      _id: "ord-1",
      orderNumber: "SM1024",
      userId: "cust-1",
      customer: "Priya Kumar",
      mobile: "9876543210",
      address: "12, Anna Nagar 2nd Street, Trichy - 620001",
      items: [
        { name: "Fresh Cow Milk", size: "1 L", quantity: 2, price: 65, total: 130 },
        { name: "Fresh Curd", size: "500 g", quantity: 1, price: 45, total: 45 },
      ],
      subtotal: 175,
      deliveryCharge: 0,
      total: 175,
      status: "Delivered",
      deliverySlot: "Early Morning (6:00 AM - 7:30 AM)",
      paymentMethod: "Cash on Delivery",
      orderDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: "ord-2",
      _id: "ord-2",
      orderNumber: "SM1025",
      userId: "cust-1",
      customer: "Priya Kumar",
      mobile: "9876543210",
      address: "12, Anna Nagar 2nd Street, Trichy - 620001",
      items: [
        { name: "Pure Cow Ghee", size: "500 ml", quantity: 1, price: 345, total: 345 },
        { name: "Fresh Paneer", size: "500 g", quantity: 1, price: 275, total: 275 },
      ],
      subtotal: 620,
      deliveryCharge: 0,
      total: 620,
      status: "Confirmed",
      deliverySlot: "Early Morning (6:00 AM - 7:30 AM)",
      paymentMethod: "UPI Online",
      orderDate: new Date().toISOString(),
    },
  ],
  subscriptions: [
    {
      id: "sub-1",
      planName: "Daily Fresh Cow Milk (1 L)",
      customer: "Priya Kumar",
      phone: "9876543210",
      product: "Fresh Cow Milk",
      quantity: "1 L",
      frequency: "Daily",
      timeSlot: "6:00 AM - 7:00 AM",
      startDate: "2026-10-01",
      status: "Active",
      monthlyTotal: 1950,
    },
    {
      id: "sub-2",
      planName: "Full Cream Milk (500 ml)",
      customer: "Arun Kumar",
      phone: "9845123654",
      product: "Full Cream Milk",
      quantity: "500 ml",
      frequency: "Daily",
      timeSlot: "6:30 AM - 7:30 AM",
      startDate: "2026-10-15",
      status: "Active",
      monthlyTotal: 1140,
    },
  ],
  notifications: [
    {
      id: "notif-1",
      title: "Order Delivered Successfully",
      message: "Your order #SM1024 has been delivered at your doorstep. Enjoy fresh Somu dairy!",
      time: "2 hours ago",
      unread: true,
      category: "delivery",
    },
    {
      id: "notif-2",
      title: "Special Weekend Offer",
      message: "Get 15% off on all Paneer and Butter orders this weekend with code WEEKEND15.",
      time: "1 day ago",
      unread: false,
      category: "offer",
    },
  ],
};

class LocalDatabase {
  constructor() {
    this.data = null;
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(DB_FILE)) {
        // Hash passwords before writing initial data
        const adminHash = bcrypt.hashSync("Admin@123", 10);
        const custHash = bcrypt.hashSync("Password@123", 10);
        initialData.admins[0].password = adminHash;
        initialData.customers[0].password = custHash;

        fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf8");
        this.data = JSON.parse(JSON.stringify(initialData));
      } else {
        const raw = fs.readFileSync(DB_FILE, "utf8");
        this.data = JSON.parse(raw);
      }
    } catch (err) {
      console.error("LocalDatabase init error:", err.message);
      this.data = JSON.parse(JSON.stringify(initialData));
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), "utf8");
    } catch (err) {
      console.error("LocalDatabase save error:", err.message);
    }
  }

  // Collection access
  collection(name) {
    if (!this.data[name]) {
      this.data[name] = [];
      this.save();
    }

    const col = this.data[name];
    const self = this;

    return {
      find(filter = {}) {
        let results = col.filter((item) => {
          for (const key of Object.keys(filter)) {
            if (filter[key] !== undefined && item[key] !== filter[key]) {
              return false;
            }
          }
          return true;
        });
        return results;
      },

      findOne(filter = {}) {
        return (
          col.find((item) => {
            for (const key of Object.keys(filter)) {
              if (filter[key] !== undefined && item[key] !== filter[key]) {
                return false;
              }
            }
            return true;
          }) || null
        );
      },

      findById(id) {
        return col.find((item) => String(item.id) === String(id) || String(item._id) === String(id)) || null;
      },

      insert(doc) {
        const id = doc.id || doc._id || "doc-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6);
        const newDoc = {
          ...doc,
          id,
          _id: id,
          createdAt: doc.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        col.unshift(newDoc);
        self.save();
        return newDoc;
      },

      updateById(id, updates) {
        const index = col.findIndex((item) => String(item.id) === String(id) || String(item._id) === String(id));
        if (index === -1) return null;
        col[index] = {
          ...col[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        self.save();
        return col[index];
      },

      deleteById(id) {
        const index = col.findIndex((item) => String(item.id) === String(id) || String(item._id) === String(id));
        if (index === -1) return false;
        col.splice(index, 1);
        self.save();
        return true;
      },
    };
  }
}

const db = new LocalDatabase();

module.exports = db;

