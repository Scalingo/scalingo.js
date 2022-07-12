import { Client } from "..";
import { BillingProfile } from "../models/billing/profiles";
/**
 * Billing API Client
 */
export default class Billing {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * Return the billing profile of current user
     * @see https://developers.scalingo.com/billing#billing-profile
     */
    profile(): Promise<BillingProfile>;
    /**
     * Create the billing profile of current user. Returns an error if already existing
     * @see https://developers.scalingo.com/billing#billing-profile
     * @param profile The billing profile to create
     */
    createProfile(profile: Omit<BillingProfile, "id">): Promise<BillingProfile>;
    /**
     * Update the billing profile of current user. Returns an error if not already existing
     * @param id The if of the billing profile to update
     * @param profile The attributes to update
     */
    updateProfile(id: string, profile: Omit<BillingProfile, "id">): Promise<BillingProfile>;
}
//# sourceMappingURL=index.d.ts.map