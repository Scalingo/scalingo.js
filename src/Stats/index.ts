import { unpackData } from '@/utils'
import { Client, APIResponse } from '..'

export interface ReferralsStats {
  /** Number of people who have clicked on the link */
  clicks: number
  /** Number of people who have signed up from the link */
  signups: number
  /** how much credit has been added to the account */
  amount_earned: number
  /** User's referral link */
  url: string
}

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
  referrals(): APIResponse<ReferralsStats> {
    return unpackData(
      this._client.apiClient().get('/account/referrals/stats'),
      'referral_stats',
    )
  }
}

export default Stats
