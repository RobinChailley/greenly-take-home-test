export class DiscountOffer {
  public partnerName: string;
  public expiresIn: number;
  public discountInPercent: number;

  constructor(partnerName, expiresIn, discountRateInPercent) {
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountRateInPercent;
  }

  private isExpired(): boolean {
    return this.expiresIn < 0;
  }

  private isOneOfThosePartners(partners: string[]): boolean {
    return partners.indexOf(this.partnerName) !== -1;
  }

  private increaseDiscountInPercentBy(increaseAmount: number): void {
    this.discountInPercent += increaseAmount;

    if (this.discountInPercent > 50) {
      this.discountInPercent = 50;
    }
  }

  private decreaseDiscountInPercentBy(decreaseAmount: number): void {
    this.discountInPercent -= decreaseAmount;

    if (this.discountInPercent < 0) {
      this.discountInPercent = 0;
    }
  }

  private vintedUpdateDiscount(): void {
    if (this.isExpired()) {
      this.discountInPercent = 0;
    } else {
      if (this.expiresIn <= 5) {
        this.increaseDiscountInPercentBy(3);
      } else if (this.expiresIn <= 10) {
        this.increaseDiscountInPercentBy(2);
      } else {
        this.increaseDiscountInPercentBy(1);
      }
    }
  }

  private updateExpiresIn(): void {
    if (!this.isOneOfThosePartners(["Ilek"])) {
      this.expiresIn -= 1;
    }
  }

  private updateDiscountInPercent(): void {
    if (this.isOneOfThosePartners(["Naturalia"])) {
      this.increaseDiscountInPercentBy(this.isExpired() ? 2 : 1);
    } else if (this.isOneOfThosePartners(["BackMarket"])) {
      this.decreaseDiscountInPercentBy(this.isExpired() ? 4 : 2);
    } else if (this.isOneOfThosePartners(["Vinted"])) {
      this.vintedUpdateDiscount();
    } else if (!this.isOneOfThosePartners(["Ilek"])) {
      this.decreaseDiscountInPercentBy(this.isExpired() ? 2 : 1);
    }
  }

  public update(): void {
    this.updateExpiresIn();
    this.updateDiscountInPercent();
  }
}
