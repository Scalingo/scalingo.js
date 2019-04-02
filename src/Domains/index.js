import {unpackData} from "../utils";

/**
 * Domains API Client
 */
export default class Domains {
    /**
     * Create a new Client for the Domains API
     * @param {Client} client - Scalingo API Client
     */
    constructor(client) {
        this._client = client;
    }

    /**
     * List all the domains of an application
     * @see http://developers.scalingo.com/domains#list-all-the-domains-of-an-application
     * @param {String} appId ID of the app to get domains list
     * @return {Promise<Domain[] | APIError>}
     */
    for(appId) {
        return unpackData(this._client.apiClient().get(`/apps/${appId}/domains`), "domains")
    }

    /**
     * Link a domain name to a specific application
     * @see http://developers.scalingo.com/domains#link-a-domain-name-to-an-application
     * @param {String} appId ID of the app to post to the specified application
     * @param {DomainParams} domain An object of the domain to link
     * @return {Promise<Domain | APIError>}
     */
    create(appId, domain) {
        return unpackData(this._client.apiClient().post(`/apps/${appId}/domains`, {domain: domain}), "domains")
    }
}

/**
 * @typedef {Object} Domain
 * @property {String} id Unique ID of the domain
 * @property {String} name Hostname your want to associate with the app
 * @property {String} tlscert Subject of the submitted certificate
 * @property {String} tlskey Private key type and length
 * @property {LetsEncryptStatus} letsecrypt_status Show the current state of the Let's Encrypt certificate
 * @property {Boolean} ssl Flag if SSL with a custom certificate is enabled
 * @property {Date} validity Once a certificate has been submitted, display the validity of it
 * @property {Boolean} canonical The domain is the canonical domain of this application
 */

/**
 * @typedef {Object} DomainParams
 * @property {String} name Hostname you want to add
 * @property {?String} tlscert Optional: SSL Certificate you want to associate with the domain
 * @property {?String} tlskey Optional: Private key used to create the SSL certificate
 * @see http://developers.scalingo.com/domains
 */

/**
 * @typedef {String} LetsEncryptStatus
 * @property {String} pending_dns We're waiting for DNS propagation (or the DNS value is not correct)
 * @property {String} new The certificate request has been sent to LE
 * @property {String} created The certificate has been created and is in use
 * @property {String} dns_required (wildcards) manual DNS action is required
 * @property {String} error There was an error while creating the certificate
 */
