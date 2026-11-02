import { USE_MOCK } from "../config";
import { api, unwrap, withId, delay } from "./api";
import * as seed from "../data/seed";

const STOCK_KEY = "somu_stock_overrides";

export function getStockOverrides() {
  try {
    return JSON.parse(localStorage.getItem(STOCK_KEY)) || {};
  } catch {
    return {};
  }
}

export function setProductStock(productId, stock, isAvailable = undefined) {
  try {
    const overrides = getStockOverrides();
    const available = isAvailable !== undefined ? isAvailable : Number(stock) > 0;
    overrides[String(productId)] = { stock: Number(stock), isAvailable: available };
    localStorage.setItem(STOCK_KEY, JSON.stringify(overrides));
    window.dispatchEvent(new CustomEvent("somu:products-updated"));
    return overrides[String(productId)];
  } catch (err) {
    console.error("Failed to update stock", err);
  }
}

function applyStockOverrides(productList) {
  const overrides = getStockOverrides();
  return productList.map((item) => {
    const override = overrides[String(item.id)];
    if (override) {
      return {
        ...item,
        stock: override.stock,
        isAvailable: override.isAvailable,
      };
    }
    const stock = item.stock !== undefined ? Number(item.stock) : 25;
    const isAvailable =
      item.isAvailable !== undefined ? Boolean(item.isAvailable) : stock > 0;
    return {
      ...item,
      stock,
      isAvailable,
    };
  });
}

export async function getProducts() {
  if (USE_MOCK) {
    await delay(100);
    return applyStockOverrides(seed.products);
  }
  const list = unwrap(await api.get("/products", { auth: false }));

  // Only keep products that have at least one size/price to show
  const filtered = list
    .map(withId)
    .filter((item) => Array.isArray(item.sizes) && item.sizes.length > 0);

  return applyStockOverrides(filtered);
}

export async function getProduct(id) {
  const products = await getProducts();
  return products.find((item) => String(item.id) === String(id)) || null;
}

export async function getPopularProducts() {
  if (USE_MOCK) {
    await delay(100);
    return applyStockOverrides(seed.popularProducts);
  }
  const list = unwrap(await api.get("/products/popular", { auth: false })).map(withId);
  return applyStockOverrides(list);
}

export async function getOffers() {
  if (USE_MOCK) {
    await delay(100);
    return seed.offers;
  }
  return unwrap(await api.get("/offers", { auth: false })).map(withId);
}

export async function getReviews() {
  if (USE_MOCK) {
    await delay(100);
    return seed.reviews;
  }
  return unwrap(await api.get("/reviews", { auth: false })).map(withId);
}
