import { DiscountOffer } from "../../src/discountOffer";
import { Store } from "../../src/store";

describe("Store", () => {
  it("should assign discounts offers if provided", () => {
    const offer = new DiscountOffer("Velib", 0, 0);
    const store = new Store([offer]);

    expect(store.discountOffers).toEqual([offer]);
  });

  it("should assign empty discount offers array if not provided", () => {
    const store = new Store();

    expect(store.discountOffers).toEqual([]);
  });

  it("should update each discountsOffers", () => {
    const offer = new DiscountOffer("Velib", 0, 0);

    offer.update = jest.fn();

    const store = new Store([offer]);

    store.updateDiscounts();

    expect(offer.update).toHaveBeenCalledTimes(1);
  });
});
