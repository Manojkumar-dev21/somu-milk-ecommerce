import { USE_MOCK } from "../config";
import { api, unwrap, withId, delay } from "./api";
import * as seed from "../data/seed";

/*
  BACKEND ENDPOINTS (public, no login needed)
    GET /products            -> list of products (with sizes)
    GET /products/popular    -> products shown on the home page
    GET /offers              -> current offers
    GET /reviews             -> customer reviews
*/

export async function getProducts() {
  if (USE_MOCK) {
    await delay();
    return seed.products;
  }
  const list = unwrap(await api.get("/products", { auth: false }));

  // Only keep products that have at least one size/price to show
  return list
    .map(withId)
    .filter((item) => Array.isArray(item.sizes) && item.sizes.length > 0);
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
  return unwrap(await api.get("/products/popular", { auth: false })).map(withId);
}

export async function getOffers() {
  if (USE_MOCK) {
    await delay();
    return seed.offers;
  }
  return unwrap(await api.get("/offers", { auth: false })).map(withId);
}

export async function getReviews() {
  if (USE_MOCK) {
    await delay();
    return seed.reviews;
  }
  return unwrap(await api.get("/reviews", { auth: false })).map(withId);
}
