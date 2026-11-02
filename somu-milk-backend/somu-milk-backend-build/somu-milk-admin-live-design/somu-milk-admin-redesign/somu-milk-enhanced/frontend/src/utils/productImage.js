import milk from "../assets/home-milk.jpg";
import curd from "../assets/home-curd.jpg";
import butter from "../assets/home-butter.jpg";
import paneer from "../assets/home-paneer.jpg";
import ghee from "../assets/home-ghee.jpg";
import icecream from "../assets/home-icecream.jpg";

import featureMilk from "../assets/feature-milk.jpg";
import featureCurd from "../assets/feature-curd.jpg";
import featureButter from "../assets/feature-butter.jpg";
import featurePaneer from "../assets/feature-paneer.jpg";

/*
  The database stores either
    - a full image link  (https://...  or /uploads/...), or
    - a short key such as "milk" for the pictures bundled with the site.
  This turns either one into something an <img> can show.
*/
const bundled = {
  milk,
  curd,
  butter,
  paneer,
  ghee,
  icecream,
  "feature-milk": featureMilk,
  "feature-curd": featureCurd,
  "feature-butter": featureButter,
  "feature-paneer": featurePaneer,
};

const byCategory = {
  "Milk Products": milk,
  "Fermented Products": curd,
  "Fat-Based Products": butter,
  Others: paneer,
};

export function resolveImage(item) {
  const image = item?.image;

  if (typeof image === "string" && /^(https?:)?\/\/|^\/|^data:/.test(image)) {
    return image;
  }

  if (image && bundled[image]) {
    return bundled[image];
  }

  return byCategory[item?.category] || milk;
}
