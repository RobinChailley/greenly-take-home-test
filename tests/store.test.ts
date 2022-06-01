import { Store } from "../src/store";
import { DiscountOffer } from "../src/discountOffer";
import { elapseDays } from "./utils";

describe("general cases", () => {
  it("should decrease the discount by 1% and expiresIn by 1day", () => {
    const store: Store = new Store([new DiscountOffer("test", 2, 30)]);

    const expectedDiscountOffer: DiscountOffer[] = [
      new DiscountOffer("test", 1, 29),
    ];

    expect(store.updateDiscounts()).toEqual(expectedDiscountOffer);
  });

  it("should decrease the discount by 2% if offer has expired", () => {
    const store = new Store([new DiscountOffer("test", 0, 30)]);

    const discountOfferAfterOneDay = store.updateDiscounts();

    expect(discountOfferAfterOneDay).toEqual([
      new DiscountOffer("test", -1, 28),
    ]);
  });
});

describe("special cases", () => {
  describe("Naturalia", () => {
    it("Naturalia discount increases the older it gets", () => {
      const store = new Store([new DiscountOffer("Naturalia", 10, 30)]);

      const discountOfferAfterOneDay = store.updateDiscounts();

      expect(discountOfferAfterOneDay).toEqual([
        new DiscountOffer("Naturalia", 9, 31),
      ]);
    });

    it("Naturalia discount increases twice  as fast after the expiration date", () => {
      const store = new Store([new DiscountOffer("Naturalia", 0, 30)]);

      const discountOfferAfterOneDay = store.updateDiscounts();

      expect(discountOfferAfterOneDay).toEqual([
        new DiscountOffer("Naturalia", -1, 32),
      ]);
    });

    it("should never have a discount higher than 50", () => {
      const store = new Store([new DiscountOffer("Naturalia", 0, 49)]);

      const discountOfferAfterOneDay = elapseDays(store, 3);

      expect(discountOfferAfterOneDay).toEqual([
        new DiscountOffer("Naturalia", -3, 50),
      ]);
    });
  });

  describe("Ilek", () => {
    it("should never expires nor decreases", () => {
      const store = new Store([new DiscountOffer("Ilek", 3, 30)]);

      const discountOfferAfterOneDay = elapseDays(store, 3);

      expect(discountOfferAfterOneDay).toEqual([
        new DiscountOffer("Ilek", 3, 30),
      ]);
    });
  });
});
