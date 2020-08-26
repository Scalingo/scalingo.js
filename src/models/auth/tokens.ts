export interface Token {
  /** ID of the token */
  id: string;
  /** Name of the token */
  name: string;
  /** Creation date of this token */
  created_at: string;
  /** Date of the last usage of this token */
  last_used_at?: string;
  /** When was the token issued */
  issued_at: string;
  /** Actual token (only shown on token creation endpoint) */
  token?: string;
}
