import { Client } from "..";
import { BillingProfile } from "../models/billing/profiles";
import { OrganizationScopedParams } from "../params/regional/organization";
import { unpackData } from "../utils";

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
   * Return the billing profile of current user, or of an organization
   * @see https://developers.scalingo.com/billing#billing-profile
   * @param opts.organization_id ID of the organization owning the billing profile
   */
  profile(opts?: OrganizationScopedParams): Promise<BillingProfile> {
    return unpackData(
      this._client.billingApiClient().get("/profile", { params: opts }),
      "profile",
    );
  }

  /**
   * Create the billing profile of current user, or of an organization. Returns an error if already existing
   * @see https://developers.scalingo.com/billing#billing-profile
   * @param profile The billing profile to create
   * @param opts.organization_id ID of the organization owning the billing profile
   */
  createProfile(
    profile: Omit<BillingProfile, "id">,
    opts?: OrganizationScopedParams,
  ): Promise<BillingProfile> {
    return unpackData(
      this._client.billingApiClient().post("/profiles", { profile, ...opts }),
      "profile",
    );
  }

  /**
   * Update the billing profile of current user. Returns an error if not already existing
   * @param id The if of the billing profile to update
   * @param profile The attributes to update
   */
  updateProfile(
    id: string,
    profile: Omit<BillingProfile, "id">,
  ): Promise<BillingProfile> {
    return unpackData(
      this._client.billingApiClient().put(`/profiles/${id}`, { profile }),
      "profile",
    );
  }
}
