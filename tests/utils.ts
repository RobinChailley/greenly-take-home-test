import { Store } from "../src/store";
import { DiscountOffer } from "../src/discountOffer";

export const elapseDays = (
  store: Store,
  daysElapsed: number
): DiscountOffer[] => {
  for (let i = 0; i < daysElapsed - 1; i++) {
    store.updateDiscounts();
  }

  return store.updateDiscounts();
};
