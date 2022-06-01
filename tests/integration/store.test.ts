import { Store } from "../../src/store";
import { DiscountOffer } from "../../src/discountOffer";
import {
  createStoreWithOneOffer,
  elapseDays,
  expectExpiresAndDiscountEquals,
} from "../utils";

describe("general cases", () => {
  it("should decrease the discount by 1% and expiresIn by 1day", () => {
    const store: Store = createStoreWithOneOffer("test", 2, 30);

    const expectedDiscountOffer: DiscountOffer[] = [
      new DiscountOffer("test", 1, 29),
    ];

    expect(store.updateDiscounts()).toEqual(expectedDiscountOffer);
  });

  it("should decrease the discount by 2% if offer has expired", () => {
    const store = createStoreWithOneOffer("test", 0, 30);

    const discountOfferAfterOneDay = store.updateDiscounts();

    expect(discountOfferAfterOneDay).toEqual([
      new DiscountOffer("test", -1, 28),
    ]);
  });
});

describe("special cases", () => {
  describe("Naturalia", () => {
    it("Naturalia discount increases the older it gets", () => {
      const store = createStoreWithOneOffer("Naturalia", 10, 30);

      const discountOfferAfterOneDay = store.updateDiscounts();

      expectExpiresAndDiscountEquals(discountOfferAfterOneDay[0], 9, 31);
    });

    it("Naturalia discount increases twice  as fast after the expiration date", () => {
      const store = createStoreWithOneOffer("Naturalia", 0, 30);

      const discountOfferAfterOneDay = store.updateDiscounts();

      expectExpiresAndDiscountEquals(discountOfferAfterOneDay[0], -1, 32);
    });

    it("should never have a discount higher than 50", () => {
      const store = createStoreWithOneOffer("Naturalia", 0, 49);

      const discountOfferAfterOneDay = elapseDays(store, 3);

      expectExpiresAndDiscountEquals(discountOfferAfterOneDay[0], -3, 50);
    });
  });

  describe("Ilek", () => {
    it("should never expires nor decreases", () => {
      const store = createStoreWithOneOffer("Ilek", 3, 30);

      const discountOfferAfterOneDay = elapseDays(store, 3);

      expectExpiresAndDiscountEquals(discountOfferAfterOneDay[0], 3, 30);
    });
  });

  describe("Vinted", () => {
    it("discount should increase as its expiration date approaches", () => {
      const store = createStoreWithOneOffer("Vinted", 30, 30);

      const discountOfferAfterOneDay = elapseDays(store, 2);

      expectExpiresAndDiscountEquals(discountOfferAfterOneDay[0], 28, 32);
    });

    it("discount should increase by 2 if expiresIn is less or equal than 10", () => {
      const store = createStoreWithOneOffer("Vinted", 8, 30);

      const discountOfferAfterOneDay = elapseDays(store, 2);

      expectExpiresAndDiscountEquals(discountOfferAfterOneDay[0], 6, 34);
    });

    it("discount should increase by 3 if expiresIn is less or equal than 5", () => {
      const store = createStoreWithOneOffer("Vinted", 3, 30);

      const discountOfferAfterOneDay = elapseDays(store, 2);

      expectExpiresAndDiscountEquals(discountOfferAfterOneDay[0], 1, 36);
    });

    it("discount should drop to 0 after the expiration date", () => {
      const store = createStoreWithOneOffer("Vinted", 1, 30);

      const discountOfferAfterOneDay = elapseDays(store, 2);

      expectExpiresAndDiscountEquals(discountOfferAfterOneDay[0], -1, 0);
    });
  });

  describe("BackMarket", () => {
    it("discount should decreases twice as fast as normal partners", () => {
      const store = createStoreWithOneOffer("BackMarket", 4, 30);

      const discountOfferAfterOneDay = elapseDays(store, 2);

      expectExpiresAndDiscountEquals(discountOfferAfterOneDay[0], 2, 26);
    });
  });
});
