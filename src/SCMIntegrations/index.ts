import { unpackData } from "../utils";
import { Client } from "..";
import { Key } from "../models/auth/keys";
import {
  SCMIntegration,
  PullRequest,
  Repository,
  Organization,
  Branch,
} from "../models/auth/scm_integrations";

import { CreateParams } from "../params/auth/scm_integrations";

/**
 * SCM Integrations API Client
 */
export default class SCMIntegrations {
  /** Scalingo API Client */
  _client: Client;

  /**
   * Create a new "thematic" client
   * @param client Scalingo API Client
   */
  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Fetch a specific SCM integration
   * @see https://developers.scalingo.com/scm_integrations#show-a-specific-scm-integration
   * @param integrationID ID of the integration
   * @return Promise that when resolved returns a SCMIntegration
   */
  find(integrationID: string): Promise<SCMIntegration> {
    return unpackData(
      this._client.authApiClient().get(`/scm_integrations/${integrationID}`),
      "scm_integration"
    );
  }

  /**
   * Get all SCM integrations related to your account
   * @see https://developers.scalingo.com/scm_integrations#list-all-the-scm-integrations-of-your-account
   * @return Promise that when resolved returns a SCMIntegration array.
   */
  all(): Promise<SCMIntegration[]> {
    return unpackData(
      this._client.authApiClient().get("/scm_integrations"),
      "scm_integrations"
    );
  }

  /**
   * Create/Link a new SCM integration. Only GitHub Enterprise and GitLab self-hosted
   * types are handled with this route.
   * @see https://developers.scalingo.com/scm_integrations#createlink-an-scm-integration-with-your-account
   * @param opts SCM integration information
   * @return Promise that when resolved returns the SCMIntegration created.
   */
  create(opts: CreateParams): Promise<SCMIntegration> {
    return unpackData(
      this._client
        .authApiClient()
        .post("/scm_integrations", { scm_integration: opts }),
      "scm_integration"
    );
  }

  /**
   * Delete/Unlink a SCM integration from your account.
   * @see https://developers.scalingo.com/scm_integrations#createlink-an-scm-integration-with-your-account
   * @param integrationID ID of the integration
   * @return Promise that resolves when the SCM integration is deleted.
   */
  destroy(integrationID: string): Promise<void> {
    return unpackData(
      this._client.authApiClient().delete(`/scm_integrations/${integrationID}`)
    );
  }

  /**
   * Import SSH keys from a SCM platform
   * @see https://developers.scalingo.com/scm_integrations#createlink-an-scm-integration-with-your-account
   * @param integrationID ID of the integration
   * @return Promise that when resolved returns the imported keys.
   */
  importSSHKeys(integrationID: string): Promise<Key[]> {
    return unpackData(
      this._client
        .authApiClient()
        .post(`/scm_integrations/${integrationID}/import_keys`),
      "keys"
    );
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
    query: string
  ): Promise<PullRequest[]> {
    return unpackData(
      this._client
        .authApiClient()
        .get(`/scm_integrations/${integrationID}/search_pull_requests`, {
          params: { query },
        }),
      "pull_requests"
    );
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
    query: string
  ): Promise<Repository[]> {
    return unpackData(
      this._client
        .authApiClient()
        .get(`/scm_integrations/${integrationID}/search_repos`, {
          params: { query },
        }),
      "repositories"
    );
  }

  /**
   * Get list of organizations attached to an SCM integration account.
   * @see https://developers.scalingo.com/scm_integrations#
   * @param integrationID ID of the integration
   * @return Promise that when resolved returns the list of organizations.
   */
  organizations(integrationID: string): Promise<Organization[]> {
    return unpackData(
      this._client
        .authApiClient()
        .get(`/scm_integrations/${integrationID}/orgs`),
      "organizations"
    );
  }

  /**
   * Search repositories in an SCM integration
   * @see https://developers.scalingo.com/scm_integrations#
   * @param integrationID ID of the integration
   * @param query Query to filter the list of repositories
   * @return Promise that when resolved returns the list of repositories matching the query.
   */
  branchesForRepo(integrationID: string, repo_name: string): Promise<Branch[]> {
    return unpackData(
      this._client
        .authApiClient()
        .get(`/scm_integrations/${integrationID}/branches`, {
          params: { repo_name },
        }),
      "branches"
    );
  }
}
