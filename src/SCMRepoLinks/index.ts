import { unpackData } from '../utils'
import { Client } from '..'

type SCMType = 'github' | 'gitlab' | 'github-enterprise' | 'gitlab-self-hosted'

/** @see https://developers.scalingo.com/scm_repo_link */
export interface SCMRepoLink {
  /** Unique ID */
  id: string

  /** Application ID */
  app_id: string

  /** ID of the SCM integration */
  scm_integration_uuid: string

  /** Description of the user that linked this repository */
  linker: Record<string, any>

  /** Repository owner name */
  owner: string

  /** Repository name */
  repo: string

  /** Name of the branch used for auto-deployment */
  branch: string

  /** Type of the SCM integration */
  scm_type: SCMType

  /** Creation date of the SCM link */
  created_at: Date

  /** Last time the SCM link has been updated */
  updated_at: Date

  /** Trigger a new deployment when the linked branch is updated */
  auto_deploy_enabled: boolean

  /** Activation of the review apps feature */
  deploy_review_apps_enabled: boolean

  /** Review App: delete the review app when the pull request is closed */
  delete_on_close_enabled: boolean

  /** Review App: time to wait before deleting a review app linked to a closed pull request (in hours) */
  hours_before_delete_on_close: number

  /** Review App: delete the review app when there is no activity on the pull request */
  delete_stale_enabled: boolean

  /** Review App: time to wait for activity on the pull request before deleting the review app (in hours) */
  hours_before_delete_stale: number

  /** Date of the last deployment triggered by this link */
  last_auto_deploy_at: string
}

/** @see https://developers.scalingo.com/scm_repo_link */
export interface Branch {
  /** Name of the branch */
  name: string
}

/** @see https://developers.scalingo.com/scm_repo_link */
export interface PullRequest {
  id: string

  /** URL to the pull/merge request */
  html_url: string

  /** Number identifying the pull/merge request on the SCM tool */
  number: number

  /** Title of the pull/merge request */
  title: string
}

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
