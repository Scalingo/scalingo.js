export declare type PricingCurrency = "EUR";
export declare type PricingPeriod = "minute";
export interface Pricing {
    price: string;
    currency: PricingCurrency;
    period: PricingPeriod;
}
export interface PricingGrid {
    default: Pricing;
}
//# sourceMappingURL=pricing.d.ts.map