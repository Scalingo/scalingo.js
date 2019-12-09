import { unpackData } from '../utils.js'

/**
 * Stats API Client
 */
export default class Stats {
  /**
   * Create a new Client for the Stats API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client
  }

  /**
   * Return referrals stats for current user
   * @return {Promise<ReferralsStats | APIError>} The referrals stats for the current user
   */
  referrals() {
    return unpackData(
      this._client.apiClient().get('/account/referrals/stats'),
      'referral_stats',
    )
  }
}

/**
 * @typedef {Object} ReferralsStats
 * @property {Number} clicks Number of people who have clicked on the link
 * @property {Number} signups Number of people who have signed up from the link
 * @property {Number} amount_earned how much credit has been added to the account
 * @property {String} url User's referral link
 */
