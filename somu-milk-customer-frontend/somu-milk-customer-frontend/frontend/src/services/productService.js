
import { USE_MOCK } from "../config";
import { api, unwrap, withId, delay } from "./api";
import * as seed from "../data/seed";

function extractList(response, key) {
  const data = unwrap(response);

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.[key])) return data[key];

  return [];
}

function normalizeCategory(category = "") {
  const value = String(category).trim().toLowerCase();

  if (["milk", "milk products"].includes(value)) {
    return "Milk Products";
  }

  if (
    ["curd", "yogurt", "yoghurt", "fermented", "fermented products"].includes(value)
  ) {
    return "Fermented Products";
  }

  if (
    ["butter", "ghee", "cream", "fat-based products"].includes(value)
  ) {
    return "Fat-Based Products";
  }

  return "Others";
}

function normalizeProduct(product) {
  const item = withId(product);
  const quantity = item.quantity;
  const unit = item.unit || "";
  const sizeLabel = [quantity, unit].filter(Boolean).join(" ");

  return {
    ...item,
    id: String(item.id ?? item._id),
    name: item.name || "Dairy Product",
    description: item.description || "",
    category: normalizeCategory(item.category),
    image: item.image || "",
    sizes: Array.isArray(item.sizes) && item.sizes.length > 0
      ? item.sizes
      : [
          {
            size: sizeLabel || "Standard",
            price: Number(item.price) || 0,
          },
        ],
  };
}

export async function getProducts() {
  if (USE_MOCK) {
    await delay();
    return seed.products;
  }

  const response = await api.get("/products", { auth: false });
  const list = extractList(response, "products");

  return list
    .map(normalizeProduct)
    .filter((item) => item.sizes.length > 0);
}

export async function getProduct(id) {
  const products = await getProducts();

  return products.find((item) => String(item.id) === String(id)) || null;
}

export async function getPopularProducts() {
  if (USE_MOCK) {
    await delay();
    return seed.popularProducts;
  }

  const response = await api.get("/products/popular", { auth: false });

  return extractList(response, "products")
    .map(normalizeProduct);
}

export async function getOffers() {
  if (USE_MOCK) {
    await delay();
    return seed.offers;
  }

  const response = await api.get("/offers", { auth: false });

  return extractList(response, "offers").map(withId);
}

export async function getReviews() {
  if (USE_MOCK) {
    await delay();
    return seed.reviews;
  }

  const response = await api.get("/reviews", { auth: false });

  return extractList(response, "reviews").map(withId);
}
