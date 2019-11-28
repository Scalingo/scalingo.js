import { unpackData } from '../utils'

/**
 * Domains API Client
 */
export default class Domains {
  /**
   * Create a new Client for the Domains API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client
  }

  /**
   * List all the domains of an application
   * @see https://developers.scalingo.com/domains#list-all-the-domains-of-an-application
   * @param {String} appId ID of the app to get domains list
   * @return {Promise<Domain[] | APIError>}
   */
  for(appId) {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/domains`),
      'domains',
    )
  }

  /**
   * Link a domain name to a specific application
   * @see https://developers.scalingo.com/domains#link-a-domain-name-to-an-application
   * @param {String} appId ID of the app to post to the specified application
   * @param {DomainParams} domain An object of the domain to link
   * @return {Promise<Domain | APIError>}
   */
  create(appId, domain) {
    return unpackData(
      this._client
        .apiClient()
        .post(`/apps/${appId}/domains`, { domain: domain }),
      'domain',
    )
  }

  /**
   * Delete a domain from a specific application
   * @see https://developers.scalingo.com/domains#unlink-a-domain-name-from-an-application
   * @param {String} appId ID of the app to post to the specified application
   * @param {String} domainId ID of the specified domain
   * @return {Promise<?APIError>}
   */
  destroy(appId, domainId) {
    return unpackData(
      this._client.apiClient().delete(`/apps/${appId}/domains/${domainId}`),
    )
  }

  /**
   * Show a specific domain from an application
   * @see https://developers.scalingo.com/domains#show-a-specific-domain-of-an-application
   * @param {String} appId ID of the app to post to the specified application
   * @param {String} domainId ID of the domain name
   * @return {Promise<Domain | APIError>}
   */
  show(appId, domainId) {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/domains/${domainId}`),
      'domain',
    )
  }

  /**
   * Update a domain from a specific application
   * @see https://developers.scalingo.com/domains#update-a-domain-name
   * @param {String} appId ID of the app to post to the specified application
   * @param {String} domainId ID of the domain to update
   * @param {DomainUpdateParams} domain An object of the domain to update
   * @return {Promise<Domain | APIError>}
   */
  update(appId, domainId, domain) {
    return unpackData(
      this._client
        .apiClient()
        .patch(`/apps/${appId}/domains/${domainId}`, { domain: domain }),
      'domain',
    )
  }
}

/**
 * @typedef {Object} Domain
 * @property {String} id Unique ID of the domain
 * @property {String} name Hostname your want to associate with the app
 * @property {String} tlscert Subject of the submitted certificate
 * @property {String} tlskey Private key type and length
 * @property {LetsEncryptStatus} letsencrypt_status Show the current state of the Let's Encrypt certificate
 * @property {Boolean} ssl Flag if SSL with a custom certificate is enabled
 * @property {Date} validity Once a certificate has been submitted, display the validity of it
 * @property {Boolean} canonical The domain is the canonical domain of this application
 * @see https://developers.scalingo.com/domains
 */

/**
 * @typedef {Object} DomainParams
 * @property {String} name Hostname you want to add
 * @property {?String} tlscert Optional: SSL Certificate you want to associate with the domain
 * @property {?String} tlskey Optional: Private key used to create the SSL certificate
 * @see https://developers.scalingo.com/domains#link-a-domain-name-to-an-application
 */

/**
 * @typedef {Object} DomainUpdateParams
 * @property {?String} tlscert Optional: SSL Certificate you want to associate with the domain
 * @property {?String} tlskey Optional: Private key used to create the SSL certificate
 * @property {?Boolean} canonical Optional: Set this domain as the canonical domain for this application
 * @see https://developers.scalingo.com/domains#update-a-domain-name
 */

/**
 * @typedef {String} LetsEncryptStatus
 * @desc
 * Can take the following values:
 * - **pending_dns**: We're waiting for DNS propagation (or the DNS value is not correct)
 * - **new**: The certificate request has been sent to LE
 * - **created**: The certificate has been created and is in use
 * - **dns_required**: (for wildcards only) manual DNS action is required
 * - **error**: There was an error while creating the certificate
 */
