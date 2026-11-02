import freshCowMilkImg from "../assets/fresh_cow_milk.png";
import fullCreamMilkImg from "../assets/full_cream_milk.png";
import flavoredMilkImg from "../assets/flavored_milk.png";
import freshCurdImg from "../assets/fresh_curd.png";
import buttermilkImg from "../assets/buttermilk.png";
import freshLassiImg from "../assets/fresh_lassi.png";
import saltedButterImg from "../assets/salted_butter.png";
import freshCreamImg from "../assets/fresh_cream.png";
import pureCowGheeImg from "../assets/pure_cow_ghee.png";
import freshPaneerImg from "../assets/fresh_panner.png";
import processedCheeseImg from "../assets/processed_cheese.png";
import milkIceCreamImg from "../assets/milk_ice_cream.png";

export const productImages = {
  freshCowMilk: freshCowMilkImg,
  fullCreamMilk: fullCreamMilkImg,
  flavoredMilk: flavoredMilkImg,
  freshCurd: freshCurdImg,
  buttermilk: buttermilkImg,
  freshLassi: freshLassiImg,
  saltedButter: saltedButterImg,
  freshCream: freshCreamImg,
  pureCowGhee: pureCowGheeImg,
  freshPaneer: freshPaneerImg,
  processedCheese: processedCheeseImg,
  milkIceCream: milkIceCreamImg,
};

const nameMapping = {
  "fresh cow milk": freshCowMilkImg,
  "full cream milk": fullCreamMilkImg,
  "flavored milk": flavoredMilkImg,
  "fresh curd": freshCurdImg,
  "curd": freshCurdImg,
  "buttermilk": buttermilkImg,
  "fresh lassi": freshLassiImg,
  "lassi": freshLassiImg,
  "salted butter": saltedButterImg,
  "butter": saltedButterImg,
  "fresh cream": freshCreamImg,
  "cream": freshCreamImg,
  "pure cow ghee": pureCowGheeImg,
  "ghee": pureCowGheeImg,
  "fresh paneer": freshPaneerImg,
  "paneer": freshPaneerImg,
  "processed cheese": processedCheeseImg,
  "cheese": processedCheeseImg,
  "milk ice cream": milkIceCreamImg,
  "ice cream": milkIceCreamImg,
};

const categoryMapping = {
  "Milk Products": freshCowMilkImg,
  "Fermented Products": freshCurdImg,
  "Fat-Based Products": saltedButterImg,
  "Others": freshPaneerImg,
};

export function resolveImage(item) {
  if (!item) return freshCowMilkImg;

  const image = item.image;

  // External or base64 URLs
  if (typeof image === "string" && /^(https?:)?\/\/|^data:/.test(image)) {
    return image;
  }

  // Lookup by product name
  const nameKey = (item.name || "").trim().toLowerCase();
  if (nameMapping[nameKey]) {
    return nameMapping[nameKey];
  }

  // Lookup by filename or key
  if (typeof image === "string") {
    const cleanImg = image.toLowerCase();
    for (const [key, val] of Object.entries(nameMapping)) {
      if (cleanImg.includes(key.replace(/\s+/g, "_")) || cleanImg.includes(key.replace(/\s+/g, ""))) {
        return val;
      }
    }
    if (cleanImg.includes("cow") || cleanImg.includes("milk")) return freshCowMilkImg;
    if (cleanImg.includes("curd")) return freshCurdImg;
    if (cleanImg.includes("butter")) return saltedButterImg;
    if (cleanImg.includes("paneer") || cleanImg.includes("panner")) return freshPaneerImg;
    if (cleanImg.includes("ghee")) return pureCowGheeImg;
    if (cleanImg.includes("icecream") || cleanImg.includes("ice_cream")) return milkIceCreamImg;
    if (cleanImg.includes("cheese")) return processedCheeseImg;
    if (cleanImg.includes("cream")) return freshCreamImg;
    if (cleanImg.includes("lassi")) return freshLassiImg;
  }

  // Fallback by category
  return categoryMapping[item.category] || freshCowMilkImg;
}

export default resolveImage;
