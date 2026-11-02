import { USE_MOCK } from "../config";
import { api, unwrap, withId, delay } from "./api";
import * as seed from "../data/seed";

/*
  BACKEND ENDPOINT (login needed)
    GET /notifications -> notifications of the logged-in customer
*/

export async function getNotifications() {
  if (USE_MOCK) {
    await delay();
    return seed.notifications;
  }
  return unwrap(await api.get("/notifications")).map(withId);
}
