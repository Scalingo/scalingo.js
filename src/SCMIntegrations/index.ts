import { unpackData } from '../utils'
import { Client, APIResponse } from '..'
import { Key } from '../Keys'

/**
 * Can take one of the following values:
 * - **github** is a GitHub.com integration
 * - **gitlab** is a GitLab.com integration
 * - **github-enterprise** is a GitHub Enterprise self-hosted instance
 * - **gitlab-self-hosted** is a GitLab self-hosted instance
 */
type SCMType = 'github' | 'gitlab' | 'github-enterprise' | 'gitlab-self-hosted'

/** @see https://developers.scalingo.com/scm_integrations */
export interface SCMIntegration {
  /** Unique ID */
  id: string
  /** Type of the SCM integration */
  scm_type: SCMType
  /** URL where the SCM platform is hosted */
  url: string
  /** Creation date of the SCM integration */
  created_at: string
  /** User ID provided by the SCM platform */
  uid: string
  /** Username provided by the SCM platform */
  username: string
  /** User avatar URL provided by the SCM platform */
  avatar_url: string
  /** User email provided by the SCM platform */
  email: string
  /** User profile URL provided by the SCM platform */
  profile_url: string
  /** Owner of the SCM integration */
  owner: Record<string, any>
}

/** @see https://developers.scalingo.com/scm_integrations#createlink-an-scm-integration-with-your-account */
export interface SCMIntegrationCreateOpts {
  /** Type of the SCM integration */
  scm_type: SCMType
  /** Endpoint URL of the SCM platform (e.g. https://gitlab.example.com) */
  url: string
  /** Access token provided by an SCM platform */
  access_token: string
}

/** @see https://developers.scalingo.com/scm_integrations# */
export interface PullRequest {
  /** Unique key ID */
  id: number
  /** Pull/Merge request number */
  number: number
  /** Title of the pull/merge request */
  title: string
  /** URL to the pull/merge request */
  html_url: string
}

/** @see https://developers.scalingo.com/scm_integrations# */
export interface Repository {
  /** Unique key ID */
  id: number
  /** Description of the repository */
  description: string
  /** Name of the repository including the name of the owner (e.g. owner/repository) */
  fullName: string
  /** Name of the repository */
  name: string
  /** URL to the repository */
  url: string
}

/** @see https://developers.scalingo.com/scm_integrations# */
export interface Organization {
  /** Unique key ID */
  id: number
  /** URL of the avatar of the organization */
  avatarUrl: string
  /** Description of the organization */
  description: string
  /** Name of the organization */
  login: string
  /** URL to the SCM API for the organization */
  url: string
}

/**
 * SCM Integrations API Client
 */
export default class SCMIntegrations {
  /** Scalingo API Client */
  _client: Client

  /**
   * Create a new "thematic" client
   * @param client Scalingo API Client
   */
  constructor(client: Client) {
    this._client = client
  }

  /**
   * Fetch a specific SCM integration
   * @see https://developers.scalingo.com/scm_integrations#show-a-specific-scm-integration
   * @param integrationID ID of the integration
   * @return Promise that when resolved returns a SCMIntegration
   */
  find(integrationID: string): APIResponse<SCMIntegration> {
    return unpackData(
      this._client.authApiClient().get(`/scm_integrations/${integrationID}`),
      'scm_integration',
    )
  }

  /**
   * Get all SCM integrations related to your account
   * @see https://developers.scalingo.com/scm_integrations#list-all-the-scm-integrations-of-your-account
   * @return Promise that when resolved returns a SCMIntegration array.
   */
  all(): APIResponse<SCMIntegration[]> {
    return unpackData(
      this._client.authApiClient().get('/scm_integrations'),
      'scm_integrations',
    )
  }

  /**
   * Create/Link a new SCM integration. Only GitHub Enterprise and GitLab self-hosted
   * types are handled with this route.
   * @see https://developers.scalingo.com/scm_integrations#createlink-an-scm-integration-with-your-account
   * @param opts SCM integration information
   * @return Promise that when resolved returns the SCMIntegration created.
   */
  create(opts: SCMIntegrationCreateOpts): APIResponse<SCMIntegration> {
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
   * @param integrationID ID of the integration
   * @return Promise that resolves when the SCM integration is deleted.
   */
  destroy(integrationID: string): APIResponse {
    return unpackData(
      this._client.authApiClient().delete(`/scm_integrations/${integrationID}`),
    )
  }

  /**
   * Import SSH keys from a SCM platform
   * @see https://developers.scalingo.com/scm_integrations#createlink-an-scm-integration-with-your-account
   * @param integrationID ID of the integration
   * @return Promise that when resolved returns the imported keys.
   */
  importSSHKeys(integrationID: string): APIResponse<Key[]> {
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
   * @param integrationID ID of the integration
   * @param query Query to filter the list of pull requests
   * @return Promise that when resolved returns the list of pull requests matching the query.
   */
  searchPullRequests(
    integrationID: string,
    query: string,
  ): APIResponse<PullRequest[]> {
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
   * @param integrationID ID of the integration
   * @param query Query to filter the list of repositories
   * @return Promise that when resolved returns the list of repositories matching the query.
   */
  searchRepositories(
    integrationID: string,
    query: string,
  ): APIResponse<Repository[]> {
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
   * @param integrationID ID of the integration
   * @return Promise that when resolved returns the list of organizations.
   */
  organizations(integrationID: string): APIResponse<Organization[]> {
    return unpackData(
      this._client
        .authApiClient()
        .get(`/scm_integrations/${integrationID}/orgs`),
      'organizations',
    )
  }
}
