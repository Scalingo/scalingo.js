import { unpackData } from '../utils'

/**
 * Billing API Client
 */
export default class Billing {
  /**
   * Create new Client for the Billing API
   * @params {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client
  }

  /**
   * Return the billing profile of current user
   * @see https://developers.scalingo.com/billing#billing-profile
   * @return {Promise<BillingProfile | APIError>}
   */
  profile() {
    return unpackData(
      this._client.billingApiClient().get('/profile'),
      'profile',
    )
  }

  /**
   * Create the billing profile of current user. Returns an error if already existing
   * @see https://developers.scalingo.com/billing#billing-profile
   * @param {BillingProfile} profile The billing profile to create
   * @return {Promise<BillingProfile | APIError>}
   */
  createProfile(profile) {
    return unpackData(
      this._client.billingApiClient().post('/profiles', { profile }),
      'profile',
    )
  }

  /**
   * Update the billing profile of current user. Returns an error if not already existing
   * @param {String} id The if of the billing profile to update
   * @param {BillingProfile} profile The attributes to update
   * @return {Promise<BillingProfile | APIError>}
   */
  updateProfile(id, profile) {
    return unpackData(
      this._client.billingApiClient().put(`/profiles/${id}`, { profile }),
      'profile',
    )
  }
}

/**
 * @typedef {Object} BillingProfile
 * @property {String} id
 * @property {String} name
 * @property {?String} email
 * @property {?String} credit
 * @property {String} address_line1
 * @property {?String} address_line2
 * @property {String} address_zip
 * @property {String} address_city
 * @property {?String} address_state
 * @property {String} address_country
 * @property {?String} vat_number
 * @property {?String} company
 * @property {?String} payment_method
 * @property {?StripePaymentMethod} stripe_payment_method
 * @property {?PaypalPaymentMethod} paypal_payment_method
 */

/**
 * @typedef {Object} StripePaymentMethod
 * @property {String} id
 * @property {?String} default_card_last4
 * @property {?String} default_card_exp
 * @property {?String} default_card_brand
 * @property {?String} default_card_name
 * @property {?String} sepa_bank_code
 * @property {?String} sepa_country
 * @property {?String} sepa_last4
 * @property {?String} sepa_mandate_reference
 * @property {?String} sepa_mandate_url
 */

/**
 * @typedef {Object} PaypalPaymentMethod
 * @property {String} id
 */
