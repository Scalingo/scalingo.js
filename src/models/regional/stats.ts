export interface ReferralsStats {
  /** Number of people who have clicked on the link */
  clicks: number;
  /** Number of people who have signed up from the link */
  signups: number;
  /** how much credit has been added to the account */
  amount_earned: number;
  /** User's referral link */
  url: string;
}
