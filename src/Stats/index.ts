import { unpackData } from '../utils'
import { Client } from '..'
import { ReferralsStats } from '../models/regional/stats'

/**
 * Stats API Client
 */
export class Stats {
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
   * Return referrals stats for current user
   * @return The referrals stats for the current user
   */
  referrals(): Promise<ReferralsStats> {
    return unpackData(
      this._client.apiClient().get('/account/referrals/stats'),
      'referral_stats',
    )
  }
}

export default Stats
