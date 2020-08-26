/** @see https://developers.scalingo.com/domains#link-a-domain-name-to-an-application */
export interface CreateParams {
  /** Hostname you want to add */
  name: string
  /** SSL Certificate you want to associate with the domain */
  tlscert?: string
  /** Private key used to create the SSL certificate */
  tlskey?: string
}

/** @see https://developers.scalingo.com/domains#update-a-domain-name */
export interface UpdateParams {
  /** SSL Certificate you want to associate with the domain */
  tlscert?: string
  /** Private key used to create the SSL certificate */
  tlskey?: string
  /** Set this domain as the canonical domain for this application */
  canonical?: boolean
}
