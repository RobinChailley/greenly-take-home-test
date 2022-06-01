import { DiscountOffer } from "../../src/discountOffer";

describe("discountOffer", () => {
  describe("isExpired", () => {
    it("should return true if expiresIn is less than 0", () => {
      const offer: DiscountOffer = new DiscountOffer("test", -2, 20);

      expect(offer["isExpired"]()).toBe(true);
    });

    it("should return false if expiresIn is more than 0", () => {
      const offer: DiscountOffer = new DiscountOffer("test", 3, 20);

      expect(offer["isExpired"]()).toBe(false);
    });
  });

  describe("isOneOfThosePartners", () => {
    it("should return true if offer is one of provided partners", () => {
      const offer: DiscountOffer = new DiscountOffer("Naturalia", 0, 0);

      expect(offer["isOneOfThosePartners"](["Naturalia", "Test"])).toBe(true);
    });

    it("should return false if offer is not one of provided partners", () => {
      const offer: DiscountOffer = new DiscountOffer("Naturalia", 0, 0);

      expect(offer["isOneOfThosePartners"](["Test 1", "Test 2"])).toBe(false);
    });
  });

  describe("increaseDiscountInPercentBy", () => {
    it("should increase offer's discount by the provided amount", () => {
      const baseDiscount = 10;
      const offer: DiscountOffer = new DiscountOffer(
        "Naturalia",
        0,
        baseDiscount
      );

      offer["increaseDiscountInPercentBy"](10);

      expect(offer.discountInPercent).toBe(baseDiscount + 10);
    });

    it("should set offer's discount to 50 if it is greater than 50 after the increase", () => {
      const offer: DiscountOffer = new DiscountOffer("Naturalia", 0, 40);

      offer["increaseDiscountInPercentBy"](20);

      expect(offer.discountInPercent).toBe(50);
    });
  });

  describe("decreaseDiscountInPercentBy", () => {
    it("should decrease offer's discount by the provided amount", () => {
      const baseDiscount = 10;
      const offer: DiscountOffer = new DiscountOffer("Naturalia", 0, 10);

      offer["decreaseDiscountInPercentBy"](3);

      expect(offer.discountInPercent).toBe(baseDiscount - 3);
    });

    it("should set offer's discount to 0 if it is lower than 0 after the decrease", () => {
      const offer: DiscountOffer = new DiscountOffer("Naturalia", 0, 10);

      offer["decreaseDiscountInPercentBy"](20);

      expect(offer.discountInPercent).toBe(0);
    });
  });

  describe("vintedUpdateDiscount", () => {
    it("should set discountInPercent to 0 if offer has expired", () => {
      const offer: DiscountOffer = new DiscountOffer("Vinted", -5, 10);

      offer["vintedUpdateDiscount"]();

      expect(offer.discountInPercent).toBe(0);
    });

    it("should increase discount by 3 if expiresIn is less or equal than 5", () => {
      const baseDiscount = 10;
      const offer: DiscountOffer = new DiscountOffer("Vinted", 3, 10);

      offer["vintedUpdateDiscount"]();

      expect(offer.discountInPercent).toBe(baseDiscount + 3);
    });

    it("should increase discount by 2 if expiresIn is less or equal than 10", () => {
      const baseDiscount = 10;
      const offer: DiscountOffer = new DiscountOffer("Vinted", 8, 10);

      offer["vintedUpdateDiscount"]();

      expect(offer.discountInPercent).toBe(baseDiscount + 2);
    });

    it("should increase discount by 1 if expiresIn is greater than 10", () => {
      const baseDiscount = 10;
      const offer: DiscountOffer = new DiscountOffer("Vinted", 13, 10);

      offer["vintedUpdateDiscount"]();

      expect(offer.discountInPercent).toBe(baseDiscount + 1);
    });
  });

  describe("updateExpiresIn", () => {
    it("should decrease expiresIn by 1", () => {
      const baseExpiresIn = 10;
      const offer: DiscountOffer = new DiscountOffer(
        "Vinted",
        baseExpiresIn,
        10
      );

      offer["updateExpiresIn"]();

      expect(offer.expiresIn).toBe(baseExpiresIn - 1);
    });

    it("should not decrease expiresIn for Ilek offers", () => {
      const baseExpiresIn = 10;
      const offer: DiscountOffer = new DiscountOffer("Ilek", baseExpiresIn, 10);

      offer["updateExpiresIn"]();

      expect(offer.expiresIn).toBe(baseExpiresIn);
    });
  });

  describe("updateDiscountInPercent", () => {
    describe("Naturalia", () => {
      it("should increase discountInPercent by 1 if the offer is not expired", () => {
        const baseDiscount = 10;
        const offer = new DiscountOffer("Naturalia", 10, baseDiscount);

        offer["updateDiscountInPercent"]();

        expect(offer.discountInPercent).toBe(baseDiscount + 1);
      });

      it("should increase discountInPercent by 2 if the offer is expired", () => {
        const baseDiscount = 10;
        const offer = new DiscountOffer("Naturalia", -3, baseDiscount);

        offer["updateDiscountInPercent"]();

        expect(offer.discountInPercent).toBe(baseDiscount + 2);
      });
    });

    describe("BackMarket", () => {
      it("should decrease discountInPercent by 2 if the offer is not expired", () => {
        const baseDiscount = 10;
        const offer = new DiscountOffer("BackMarket", 10, baseDiscount);

        offer["updateDiscountInPercent"]();

        expect(offer.discountInPercent).toBe(baseDiscount - 2);
      });

      it("should decrease discountInPercent by 4 if the offer is expired", () => {
        const baseDiscount = 10;
        const offer = new DiscountOffer("BackMarket", -3, baseDiscount);

        offer["updateDiscountInPercent"]();

        expect(offer.discountInPercent).toBe(baseDiscount - 4);
      });
    });

    describe("Vinted", () => {
      it("should vintedUpdateDiscount()", () => {
        const offer = new DiscountOffer("Vinted", 0, 0);
        offer["vintedUpdateDiscount"] = jest.fn();

        offer["updateDiscountInPercent"]();

        expect(offer["vintedUpdateDiscount"]).toHaveBeenCalledTimes(1);
      });
    });

    describe("Normal case", () => {
      it("should decrease discountInPercent by 1 if the offer is not expired", () => {
        const baseDiscount = 10;
        const offer = new DiscountOffer("Velib", 10, baseDiscount);

        offer["updateDiscountInPercent"]();

        expect(offer.discountInPercent).toBe(baseDiscount - 1);
      });

      it("should decrease discountInPercent by 2 if the offer is expired", () => {
        const baseDiscount = 10;
        const offer = new DiscountOffer("Velib", -3, baseDiscount);

        offer["updateDiscountInPercent"]();

        expect(offer.discountInPercent).toBe(baseDiscount - 2);
      });
    });

    describe("Ilek", () => {
      it("should not do anything", () => {
        const baseExpiresIn = 10;
        const baseDiscount = 10;
        const offer = new DiscountOffer("Ilek", baseExpiresIn, baseDiscount);

        offer["updateDiscountInPercent"]();

        expect(offer.discountInPercent).toBe(baseDiscount);
        expect(offer.expiresIn).toBe(baseExpiresIn);
      });
    });
  });

  describe("update", () => {
    it("should updateExpiresIn and updateDiscountInPercent", () => {
      const offer: DiscountOffer = new DiscountOffer("Ilek", 10, 10);
      offer["updateExpiresIn"] = jest.fn();
      offer["updateDiscountInPercent"] = jest.fn();

      offer.update();

      expect(offer["updateExpiresIn"]).toHaveBeenCalledTimes(1);
      expect(offer["updateDiscountInPercent"]).toHaveBeenCalledTimes(1);
    });
  });
});
