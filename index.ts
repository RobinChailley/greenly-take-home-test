import { Store } from "./src/store";
import { DiscountOffer } from "./src/discountOffer";

import fs from "fs";

const discountOffers = [
  new DiscountOffer("Velib", 20, 30),
  new DiscountOffer("Naturalia", 10, 5),
  new DiscountOffer("Vinted", 5, 40),
  new DiscountOffer("Ilek", 15, 40),
];
const store = new Store(discountOffers);

let log = "";

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log += JSON.stringify(store.updateDiscounts());
}

/* eslint-disable no-console */
fs.writeFile("my-output.txt", log, (err) => {
  if (err) {
    console.log("error");
  } else {
    console.log("success");
  }
});
/* eslint-enable no-console */
