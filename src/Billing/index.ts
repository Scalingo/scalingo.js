import { unpackData } from '../utils'
import { Client, APIResponse } from '..'

export interface BillingProfile {
  id: string
  name: string
  email?: string
  credit?: string
  address_line1: string
  address_line2?: string
  address_zip: string
  address_city: string
  address_state?: string
  address_country: string
  vat_number?: string
  company?: string
  payment_method?: string
  stripe_payment_method?: StripePaymentMethod
  paypal_payment_method?: PaypalPaymentMethod
}

export interface StripePaymentMethod {
  id: string
  default_card_last4?: string
  default_card_exp?: string
  default_card_brand?: string
  default_card_name?: string
  sepa_bank_code?: string
  sepa_country?: string
  sepa_last4?: string
  sepa_mandate_reference?: string
  sepa_mandate_url?: string
}

export interface PaypalPaymentMethod {
  id: string
}

/**
 * Billing API Client
 */
export default class Billing {
  /** Scalingo API Client */
  _client: Client

  /**
   * Create a new "thematic" client
   * @param client Scalingo API Client
   */
  constructor(client: Client) {
    this._client = client
  }

  /**
   * Return the billing profile of current user
   * @see https://developers.scalingo.com/billing#billing-profile
   */
  profile(): APIResponse<BillingProfile> {
    return unpackData(
      this._client.billingApiClient().get('/profile'),
      'profile',
    )
  }

  /**
   * Create the billing profile of current user. Returns an error if already existing
   * @see https://developers.scalingo.com/billing#billing-profile
   * @param profile The billing profile to create
   */
  createProfile(
    profile: Omit<BillingProfile, 'id'>,
  ): APIResponse<BillingProfile> {
    return unpackData(
      this._client.billingApiClient().post('/profiles', { profile }),
      'profile',
    )
  }

  /**
   * Update the billing profile of current user. Returns an error if not already existing
   * @param id The if of the billing profile to update
   * @param profile The attributes to update
   */
  updateProfile(
    id: string,
    profile: Omit<BillingProfile, 'id'>,
  ): APIResponse<BillingProfile> {
    return unpackData(
      this._client.billingApiClient().put(`/profiles/${id}`, { profile }),
      'profile',
    )
  }
}
