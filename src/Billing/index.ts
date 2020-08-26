import { unpackData } from "../utils";
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
  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Return the billing profile of current user
   * @see https://developers.scalingo.com/billing#billing-profile
   */
  profile(): Promise<BillingProfile> {
    return unpackData(
      this._client.billingApiClient().get("/profile"),
      "profile"
    );
  }

  /**
   * Create the billing profile of current user. Returns an error if already existing
   * @see https://developers.scalingo.com/billing#billing-profile
   * @param profile The billing profile to create
   */
  createProfile(profile: Omit<BillingProfile, "id">): Promise<BillingProfile> {
    return unpackData(
      this._client.billingApiClient().post("/profiles", { profile }),
      "profile"
    );
  }

  /**
   * Update the billing profile of current user. Returns an error if not already existing
   * @param id The if of the billing profile to update
   * @param profile The attributes to update
   */
  updateProfile(
    id: string,
    profile: Omit<BillingProfile, "id">
  ): Promise<BillingProfile> {
    return unpackData(
      this._client.billingApiClient().put(`/profiles/${id}`, { profile }),
      "profile"
    );
  }
}
