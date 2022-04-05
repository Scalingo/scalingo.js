export type PricingCurrency = "EUR";
export type PricingPeriod = "minute";

export interface Pricing {
  price: string;
  currency: PricingCurrency;
  period: PricingPeriod;
}

export interface PricingGrid {
  default: Pricing;
}
