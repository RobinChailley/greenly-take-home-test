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

export const createStoreWithOneOffer = (
  partnerName: string,
  expiresIn: number,
  discountRateInPercent: number
): Store => {
  return new Store([
    new DiscountOffer(partnerName, expiresIn, discountRateInPercent),
  ]);
};

export const expectExpiresAndDiscountEquals = (
  discountOffer: DiscountOffer,
  expiresIn: number,
  discountInPercent: number
): void => {
  expect(discountOffer.discountInPercent).toEqual(discountInPercent);
  expect(discountOffer.expiresIn).toEqual(expiresIn);
};
