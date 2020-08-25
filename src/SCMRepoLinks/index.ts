import { unpackData } from '../utils'
import { Client } from '..'
import { SCMRepoLink } from '../models/regional/scm_repo_links'

/** @see https://developers.scalingo.com/scm_repo_link#create-a-scm-integration-link */
export interface SCMRepoLinkCreateOpts {
  source?: string
  branch?: string
  auth_integration_uuid?: string
  auto_deploy_enabled?: boolean
  deploy_review_apps_enabled?: boolean
  delete_on_close_enabled?: boolean
  hours_before_delete_on_close?: number
  delete_stale_enabled?: boolean
  hours_before_delete_stale?: number
}

/** @see https://developers.scalingo.com/scm_repo_link#update-a-scm-integration-link */
export interface SCMRepoLinkUpdateOpts {
  branch?: string
  auto_deploy_enabled?: boolean
  deploy_review_apps_enabled?: boolean
  delete_on_close_enabled?: boolean
  hours_before_delete_on_close?: number
  delete_stale_enabled?: boolean
  hours_before_delete_stale?: number
}

/**
 * SCM repo links API Client
 */
export class SCMRepoLinks {
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
   * Get the repo link associated to an application.
   * @see https://developers.scalingo.com/scm_repo_link#get-an-integration-link
   * @param appID ID of the application
   * @return Promise that when resolved returns a SCMRepoLink
   */
  find(appID: string): Promise<SCMRepoLink> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appID}/scm_repo_link`),
      'scm_repo_link',
    )
  }

  /**
   * Create a SCM repo link.
   * @see https://developers.scalingo.com/scm_repo_link#create-a-scm-integration-link
   * @param appID ID of the application
   * @param opts SCM repo link information
   * @return Promise that when resolved returns the SCMRepoLink created.
   */
  create(appID: string, opts: SCMRepoLinkCreateOpts): Promise<SCMRepoLink> {
    return unpackData(
      this._client
        .apiClient()
        .post(`/apps/${appID}/scm_repo_link`, { scm_repo_link: opts }),
      'scm_repo_link',
    )
  }

  /**
   * Update a SCM integration link.
   * @see https://developers.scalingo.com/scm_repo_link
   * @param appID ID of the application
   * @param opts SCM repo link information to update
   * @return Promise that when resolved returns the SCMRepoLink updated.
   */
  update(appID: string, opts: SCMRepoLinkCreateOpts): Promise<SCMRepoLink> {
    return unpackData(
      this._client
        .apiClient()
        .patch(`/apps/${appID}/scm_repo_link`, { scm_repo_link: opts }),
      'scm_repo_link',
    )
  }

  /**
   * Delete a SCM repo link
   * @see https://developers.scalingo.com/scm_repo_link#delete-an-integration-link
   * @param {String} appID ID of the application
   * @return {Promise<null>} Promise that resolves when the link is deleted.
   */
  destroy(appID: string): Promise<void> {
    return unpackData(
      this._client.apiClient().delete(`/apps/${appID}/scm_repo_link`),
    )
  }

  /**
   * Manually deploy an application
   * @see https://developers.scalingo.com/scm_repo_link#manual-deploy
   * @param appID ID of the application
   * @param branch Name of the branch to deploy.
   * @return Promise that when resolved returns the Deployment started.
   * @todo Promise<Deployment>
   */
  manualDeploy(appID: string, branch: string): Promise<any> {
    return unpackData(
      this._client
        .apiClient()
        .post(`/apps/${appID}/scm_repo_link/manual_deploy`, {
          branch,
        }),
      'deployment',
    )
  }

  /**
   * Manually deploy a review app of the given pull/merge request
   * @see https://developers.scalingo.com/scm_repo_link#manual-review-app
   * @param appID ID of the application
   * @param pullRequestID ID of the pull/merge request to deploy
   * @return Promise that when resolved returns the App created.
   * @todo Promise<App>
   */
  manualReviewApp(appID: string, pullRequestID: string): Promise<any> {
    return unpackData(
      this._client
        .apiClient()
        .post(`/apps/${appID}/scm_repo_link/manual_review_app`, {
          pull_request_id: pullRequestID,
        }),
      'review_app',
    )
  }

  /**
   * List the branches of the remote repository.
   * @see https://developers.scalingo.com/scm_repo_link
   * @param appID ID of the application
   * @return Promise that when resolved returns an array of branches.
   * @todo Promise<Branch[]>
   */
  branches(appID: string): Promise<any> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appID}/scm_repo_link/branches`),
      'branches',
    )
  }

  /**
   * List the merge/pull requests of the remote repository.
   * @see https://developers.scalingo.com/scm_repo_link
   * @param appID ID of the application
   * @return Promise that when resolved returns an array of pull requests.
   * @todo Promise<PullRequest[]>
   */
  pulls(appID: string): Promise<any> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appID}/scm_repo_link/pulls`),
      'pulls',
    )
  }
}

export default SCMRepoLinks
