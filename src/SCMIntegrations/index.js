import { unpackData } from '../utils.js'

/**
 * SCM Integrations API Client
 */
export default class SCMIntegrations {
  /**
   * Create a new Client for the SCM integrations API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client
  }

  /**
   * Fetch a specific SCM integration
   * @see https://developers.scalingo.com/scm_integrations#show-a-specific-scm-integration
   * @param {String} integrationID - ID of the integration
   * @return {Promise<SCMIntegration,APIError>} Promise that when resolved returns a SCMIntegration
   */
  find(integrationID) {
    return unpackData(
      this._client.authApiClient().get(`/scm_integrations/${integrationID}`),
      'scm_integration',
    )
  }

  /**
   * Get all SCM integrations related to your account
   * @see https://developers.scalingo.com/scm_integrations#list-all-the-scm-integrations-of-your-account
   * @return {Promise<SCMIntegration[], APIError>} Promise that when resolved returns a SCMIntegration array.
   */
  all() {
    return unpackData(
      this._client.authApiClient().get('/scm_integrations'),
      'scm_integrations',
    )
  }

  /**
   * Create/Link a new SCM integration. Only GitHub Enterprise and GitLab self-hosted
   * types are handled with this route.
   * @see https://developers.scalingo.com/scm_integrations#createlink-an-scm-integration-with-your-account
   * @param {SCMIntegrationCreateOpts} opts - SCM integration information
   * @return {Promise<SCMIntegration, APIError>} Promise that when resolved returns the SCMIntegration created.
   */
  create(opts) {
    return unpackData(
      this._client
        .authApiClient()
        .post('/scm_integrations', { scm_integration: opts }),
      'scm_integration',
    )
  }

  /**
   * Delete/Unlink a SCM integration from your account.
   * @see https://developers.scalingo.com/scm_integrations#createlink-an-scm-integration-with-your-account
   * @param {String} integrationID - ID of the integration
   * @return {Promise<null, APIError>} Promise that resolves when the SCM integration is deleted.
   */
  destroy(integrationID) {
    return unpackData(
      this._client.authApiClient().delete(`/scm_integrations/${integrationID}`),
    )
  }

  /**
   * Import SSH keys from a SCM platform
   * @see https://developers.scalingo.com/scm_integrations#createlink-an-scm-integration-with-your-account
   * @param {String} integrationID - ID of the integration
   * @return {Promise<SSHKey[], APIError>} Promise that when resolved returns the imported keys.
   */
  importSSHKeys(integrationID) {
    return unpackData(
      this._client
        .authApiClient()
        .post(`/scm_integrations/${integrationID}/import_keys`),
      'keys',
    )
  }
}

/**
 * @typedef {Object} SCMIntegration
 * @see https://developers.scalingo.com/scm_integrations
 * @property {String} id Unique ID
 * @property {SCMType} scm_type Type of the SCM integration
 * @property {String} url URL where the SCM platform is hosted
 * @property {Date} created_at Creation date of the SCM integration
 * @property {String} uid User ID provided by the SCM platform
 * @property {String} username Username provided by the SCM platform
 * @property {String} avatar_url User avatar URL provided by the SCM platform
 * @property {String} email User email provided by the SCM platform
 * @property {String} profile_url User profile URL provided by the SCM platform
 * @property {Object} owner Owner of the SCM integration
 */

/**
 * @typedef {String} SCMType
 * @desc
 * Can take one of the following values:
 * - **github** is a GitHub.com integration
 * - **gitlab** is a GitLab.com integration
 * - **github-enterprise** is a GitHub Enterprise self-hosted instance
 * - **gitlab-self-hosted** is a GitLab self-hosted instance
 */

/**
 * @typedef {Object} SCMIntegrationCreateOpts
 * @see https://developers.scalingo.com/scm_integrations#createlink-an-scm-integration-with-your-account
 * @property {SCMType} scm_type Type of the SCM integration
 * @property {String} url Endpoint URL of the SCM platform (e.g.
 * https://gitlab.example.com)
 * @property {String} access_token Access token provided by an SCM platform
 */

/**
 * @typedef {Object} Key
 * @see https://developers.scalingo.com/scm_integrations#createlink-an-scm-integration-with-your-account
 * @property {String} id Unique key ID
 * @property {String} name Key name
 * @property {String} content
 * @property {String} fingerprint Fingerprint of the SSH key
 * @property {Date} created_at Creation date of the SCM integration
 * @property {Object} owner Owner of the SSH key
 */
