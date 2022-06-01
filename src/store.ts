import { DiscountOffer } from "./discountOffer";

export class Store {
  public discountOffers: DiscountOffer[];

  constructor(discountOffers: DiscountOffer[] = []) {
    this.discountOffers = discountOffers;
  }

  updateDiscounts(): DiscountOffer[] {
    this.discountOffers.forEach((discountOffer) => {
      discountOffer.update();
    });

    return this.discountOffers;
  }
}
