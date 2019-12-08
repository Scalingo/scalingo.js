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
   * @return {Promise<Key[], APIError>} Promise that when resolved returns the imported keys.
   */
  importSSHKeys(integrationID) {
    return unpackData(
      this._client
        .authApiClient()
        .post(`/scm_integrations/${integrationID}/import_keys`),
      'keys',
    )
  }

  /**
   * Search pull requests in an SCM integration
   * @see https://developers.scalingo.com/scm_integrations#
   * @param {String} integrationID - ID of the integration
   * @param {String} query - Query to filter the list of pull requests
   * @return {Promise<PullRequest[], APIError>} Promise that when resolved returns the list of pull requests matching the query.
   */
  searchPullRequests(integrationID, query) {
    return unpackData(
      this._client
        .authApiClient()
        .get(`/scm_integrations/${integrationID}/search_pull_requests`, {
          params: { query },
        }),
      'pull_requests',
    )
  }

  /**
   * Search repositories in an SCM integration
   * @see https://developers.scalingo.com/scm_integrations#
   * @param {String} integrationID - ID of the integration
   * @param {String} query - Query to filter the list of repositories
   * @return {Promise<Repository[], APIError>} Promise that when resolved returns the list of repositories matching the query.
   */
  searchRepositories(integrationID, query) {
    return unpackData(
      this._client
        .authApiClient()
        .get(`/scm_integrations/${integrationID}/search_repos`, {
          params: { query },
        }),
      'repositories',
    )
  }

  /**
   * Get list of organizations attached to an SCM integration account.
   * @see https://developers.scalingo.com/scm_integrations#
   * @param {String} integrationID - ID of the integration
   * @return {Promise<Organization[], APIError>} Promise that when resolved returns the list of organizations.
   */
  organizations(integrationID) {
    return unpackData(
      this._client
        .authApiClient()
        .get(`/scm_integrations/${integrationID}/orgs`),
      'organizations',
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
 * @typedef {Object} PullRequest
 * @see https://developers.scalingo.com/scm_integrations#
 * @property {Number} id Unique key ID
 * @property {Number} number Pull/Merge request number
 * @property {String} title Title of the pull/merge request
 * @property {String} html_url URL to the pull/merge request
 */

/**
 * @typedef {Object} Repository
 * @see https://developers.scalingo.com/scm_integrations#
 * @property {Number} id Unique key ID
 * @property {String} description Description of the repository
 * @property {String} fullName Name of the repository including the name of the
 * owner (e.g. owner/repository)
 * @property {String} name Name of the repository
 * @property {String} url URL to the repository
 */

/**
 * @typedef {Object} Organization
 * @see https://developers.scalingo.com/scm_integrations#
 * @property {Number} id Unique key ID
 * @property {String} avatarUrl URL of the avatar of the organization
 * @property {String} description Description of the organization
 * @property {String} login Name of the organization
 * @property {String} url URL to the SCM API for the organization
 */
