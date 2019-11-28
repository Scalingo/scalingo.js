import Apps from './Apps'
import Addons from './Addons'
import Collaborators from './Collaborators'
import Containers from './Containers'
import Deployments from './Deployments'
import Domains from './Domains'
import Environment from './Environment'
import Events from './Events'
import Logs from './Logs'
import Metrics from './Metrics'
import Notifiers from './Notifiers'
import NotificationPlatforms from './NotificationPlatforms'
import Operations from './Operations'
import SCMIntegrations from './SCMIntegrations'
import SCMRepoLinks from './SCMRepoLinks'
import Tokens from './Tokens'
import Users from './Users'

import axios from 'axios'

class Client {
  /**
   * Create a new Client for the Scalingo API.
   * @param {String} token - Bearer Token for the current user.
   * @param {Object} opts - Optional configuration
   * @param {String} [opts.apiUrl=https://api.scalingo.com] - URL to the Scalingo API.
   * @param {String} [opts.authApiUrl=https://auth.scalingo.com] - URL to the Scalingo Authentication API.
   * @param {String} [opts.noUserAgent=false] - Do not set the user agent
   */
  constructor(token, opts = {}) {
    const { apiUrl, authApiUrl } = opts

    this._token = token
    this._apiUrl = apiUrl || 'https://api.scalingo.com'
    this._authApiUrl = authApiUrl || 'https://auth.scalingo.com'
    this._headers = {}
    if (opts && !opts.noUserAgent) {
      this._headers['User-Agent'] = 'Scalingo Javascript Client'
    }

    /**
     * Apps API
     * @type {Apps}
     */
    this.Apps = new Apps(this)
    /**
     * Containers API
     * @type {Containers}
     */
    this.Containers = new Containers(this)

    /**
     * Users API
     * @type {Users}
     */
    this.Users = new Users(this)

    /**
     * SCMIntegrations API
     * @type {SCMIntegrations}
     */
    this.SCMIntegrations = new SCMIntegrations(this)

    /**
     * SCM Repo Links API
     * @type {SCMRepoLinks}
     */
    this.SCMRepoLinks = new SCMRepoLinks(this)

    /**
     * Tokens API
     * @type {Tokens}
     */
    this.Tokens = new Tokens(this)

    /**
     * Metrics API
     * @type {Metrics}
     */
    this.Metrics = new Metrics(this)

    /**
     * Domains API
     * @type {Domains}
     */
    this.Domains = new Domains(this)

    /**
     * Environment API
     * @type {Environment}
     */
    this.Environment = new Environment(this)

    /**
     * Deployments API
     * @type {Environment}
     */
    this.Deployments = new Deployments(this)

    /**
     * Logs API
     * @type {Logs}
     */
    this.Logs = new Logs(this)

    /**
     * Addons API
     * @type {Addons}
     */
    this.Addons = new Addons(this)

    /**
     * Operations API
     * @type {Operation}
     */
    this.Operations = new Operations(this)

    /**
     * Events API
     * @type {Events}
     */
    this.Events = new Events(this)

    /**
     * Collaborators API
     * @type {Collaborators}
     */
    this.Collaborators = new Collaborators(this)

    /**
     * Notifiers API
     * @type {Notifiers}
     */
    this.Notifiers = new Notifiers(this)

    /**
     * Notification platforms API
     * @type {NotificationPlatforms}
     */
    this.NotificationPlatforms = new NotificationPlatforms(this)
  }

  /**
   * Create an axios instance configured for the Scalingo API
   * @return {Object} Axios client for the Scalingo API
   */
  apiClient() {
    return axios.create({
      baseURL: `${this._apiUrl}/v1/`,
      headers: Object.assign({}, this._headers, {
        Authorization: `Bearer ${this._token}`,
      }),
    })
  }

  /**
   * Create an axios instance configured for the Scalingo Authentication API
   * @return {Object} Axios client for the Scalingo Authentication API
   */
  authApiClient() {
    return axios.create({
      baseURL: `${this._authApiUrl}/v1/`,
      headers: Object.assign({}, this._headers, {
        Authorization: `Bearer ${this._token}`,
      }),
    })
  }

  /**
   * Create a vanilla axios instance
   * @return {Object} Axios instance
   */
  unauthenticatedClient() {
    return axios.create({
      baseURL: `${this._apiUrl}/v1/`,
      headers: this._headers,
    })
  }
}

export default Client
export { Client }

/**
 * Return a client from a user token.
 * It exchange the token and then return a new client.
 * @param {String} token A User token
 * @param {Object} opts - Optional configuration
 * @param {String} [opts.apiUrl=https://api.scalingo.com] - URL to the Scalingo API.
 * @param {String} [opts.authApiUrl=https://auth.scalingo.com] - URL to the Scalingo Authentication API.
 * @return {Promise<Client | Error>} a valid Client
 */
export async function clientFromToken(token, opts) {
  const client = new Client('', opts)
  const bearerToken = await client.Tokens.exchange(token)
  client._token = bearerToken
  return client
}
