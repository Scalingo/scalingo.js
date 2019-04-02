import {unpackData} from "../utils";

/**
 * Domains API Client
 */
export default class Domains {
    /**
     * Create a new Client for the Containers API
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
     * @param {Domain[]} domain An object of the domain to link
     * @return {Promise<Domain[] | APIError>}
     */
    link(appId, domain) {
        return unpackData(this._client.apiClient().post(`/apps/${appId}/domains`, {domains: domain}), "domains")
    }
}

/**
 * @typedef {Object} Domain
 * @see http://developers.scalingo.com/domains
 * @property {String} id Unique ID of the domain
 * @property {String} name Hostname your want to associate with the app
 * @property {String} tlscert Subject of the submitted certificate
 * @property {String} tlskey Private key type and length
 * @property {Boolean} ssl Flag if SSL with a custom certificate is enabled
 * @property {Date} validity Once a certificate has been submitted, display the validity of it
 * @property {Boolean} canonical The domain is the canonical domain of this application
 */
