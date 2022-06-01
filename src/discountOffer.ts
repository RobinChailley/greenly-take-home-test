export class DiscountOffer {
  public partnerName: string;
  public expiresIn: number;
  public discountInPercent: number;

  constructor(partnerName, expiresIn, discountRateInPercent) {
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountRateInPercent;
  }
}
