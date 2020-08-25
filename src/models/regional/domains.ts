/**
 * @desc
 * Can take the following values:
 * - **pending_dns**: We're waiting for DNS propagation (or the DNS value is not correct)
 * - **new**: The certificate request has been sent to LE
 * - **created**: The certificate has been created and is in use
 * - **dns_required**: (for wildcards only) manual DNS action is required
 * - **error**: There was an error while creating the certificate
 */
export type LetsEncryptStatus =
  | 'pending_dns'
  | 'new'
  | 'created'
  | 'dns_required'
  | 'error'

/** @see https://developers.scalingo.com/domains */
export interface Domain {
  /** Unique ID of the domain */
  id: string
  /** Hostname your want to associate with the app */
  name: string
  /** Subject of the submitted certificate */
  tlscert: string
  /** Private key type and length */
  tlskey: string
  /** Show the current state of the Let's Encrypt certificate */
  letsencrypt_status: LetsEncryptStatus
  /** Flag if SSL with a custom certificate is enabled */
  ssl: boolean
  /** Once a certificate has been submitted, display the validity of it */
  validity: string
  /** The domain is the canonical domain of this application */
  canonical: boolean
}
