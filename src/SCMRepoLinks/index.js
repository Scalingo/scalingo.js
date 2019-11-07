import { unpackData } from '../utils.js'

/**
 * SCM repo links API Client
 */
export default class SCMRepoLinks {
  /**
   * Create a new Client for the SCM repo links API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client
  }

  /**
   * Get the repo link associated to an application.
   * @see https://developers.scalingo.com/scm_repo_link#get-an-integration-link
   * @param {String} appID - ID of the application
   * @return {Promise<SCMRepoLink, APIError>} Promise that when resolved returns a SCMRepoLink
   */
  find(appID) {
    return unpackData(
      this._client.apiClient().get(`/apps/${appID}/scm_repo_link`),
      'scm_repo_link',
    )
  }

  /**
   * Create a SCM repo link.
   * @see https://developers.scalingo.com/scm_repo_link#create-a-scm-integration-link
   * @param {String} appID - ID of the application
   * @param {SCMRepoLinkCreateOpts} opts - SCM repo link information
   * @return {Promise<SCMRepoLink, APIError>} Promise that when resolved returns the SCMRepoLink created.
   */
  create(appID, opts) {
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
   * @param {String} appID - ID of the application
   * @param {SCMRepoLinkCreateOpts} opts - SCM repo link information to update
   * @return {Promise<SCMRepoLink, APIError>} Promise that when resolved returns the SCMRepoLink updated.
   */
  update(appID, opts) {
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
   * @return {Promise<null, APIError>} Promise that resolves when the link is deleted.
   */
  destroy(appID) {
    return unpackData(
      this._client.apiClient().delete(`/apps/${appID}/scm_repo_link`),
    )
  }

  /**
   * Manually deploy an application
   * @see https://developers.scalingo.com/scm_repo_link#manual-deploy
   * @param {String} appID ID of the application
   * @param {String} branch Name of the branch to deploy.
   * @return {Promise<Deployment, APIError>} Promise that when resolved returns the Deployment started.
   */
  manualDeploy(appID, branch) {
    return unpackData(
      this._client
        .apiClient()
        .post(`/apps/${appID}/scm_repo_link/manual_deploy`, {
          branch,
        }),
    )
  }

  /**
   * Manually deploy a review app of the given pull/merge request
   * @see https://developers.scalingo.com/scm_repo_link#manual-review-app
   * @param {String} appID ID of the application
   * @param {String} pullRequestID ID of the pull/merge request to deploy
   * @return {Promise<App, APIError>} Promise that when resolved returns the App
   * created.
   */
  manualReviewApp(appID, pullRequestID) {
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
   * @param {String} appID - ID of the application
   * @return {Promise<Branch[], APIError>} Promise that when resolved returns an
   * array of branches.
   */
  branches(appID) {
    return unpackData(
      this._client.apiClient().get(`/apps/${appID}/scm_repo_link/branches`),
      'branches',
    )
  }

  /**
   * List the merge/pull requests of the remote repository.
   * @see https://developers.scalingo.com/scm_repo_link
   * @param {String} appID - ID of the application
   * @return {Promise<PullRequest[], APIError>} Promise that when resolved returns an
   * array of pull requests.
   */
  pulls(appID) {
    return unpackData(
      this._client.apiClient().get(`/apps/${appID}/scm_repo_link/pulls`),
      'pulls',
    )
  }
}

/**
 * @typedef {Object} SCMRepoLink
 * @see https://developers.scalingo.com/scm_repo_link
 * @property {String} id Unique ID
 * @property {String} app_id Application ID
 * @property {String} scm_integration_uuid ID of the SCM integration
 * @property {Object} linker Description of the user that linked this repository
 * @property {String} owner Repository owner name
 * @property {String} repo Repository name
 * @property {String} branch Name of the branch used for auto-deployment
 * @property {SCMType} scm_type Type of the SCM integration
 * @property {Date} created_at Creation date of the SCM link
 * @property {Date} updated_at Last time the SCM link has been updated
 * @property {Boolean} auto_deploy_enabled Trigger a new deployment when the linked branch is updated
 * @property {Boolean} deploy_review_apps_enabled Activation of the review apps feature
 * @property {Boolean} delete_on_close_enabled Review App: delete the review app when the pull request is closed
 * @property {Number} hours_before_delete_on_close Review App: time to wait before deleting a review app linked to a closed pull request (in hours)
 * @property {Boolean} delete_stale_enabled Review App: delete the review app when there is no activity on the pull request
 * @property {number} hours_before_delete_stale Review App: time to wait for activity on the pull request before deleting the review app (in hours)
 * @property {Date} last_auto_deploy_at Date of the last deployment triggered by this link
 */

/**
 * @typedef {Object} Branch
 * @see https://developers.scalingo.com/scm_repo_link
 * @property {String} name Name of the branch
 */

/**
 * @typedef {Object} PullRequest
 * @see https://developers.scalingo.com/scm_repo_link
 * @property {Number} id
 * @property {String} html_url URL to the pull/merge request
 * @property {Number} number Number identifying the pull/merge request on the
 * SCM tool
 * @property {String} title Title of the pull/merge request
 */

/**
 * @typedef {Object} SCMRepoLinkCreateOpts
 * @see https://developers.scalingo.com/scm_repo_link#create-a-scm-integration-link
 * @property {?String} source
 * @property {?String} branch
 * @property {?String} auth_integration_uuid
 * @property {?Boolean} auto_deploy_enabled
 * @property {?Boolean} deploy_review_apps_enabled
 * @property {?Boolean} delete_on_close_enabled
 * @property {?Number} hours_before_delete_on_close
 * @property {?Boolean} delete_stale_enabled
 * @property {?Number} hours_before_delete_stale
 */

/**
 * @typedef {Object} SCMRepoLinkUpdateOpts
 * @see https://developers.scalingo.com/scm_repo_link#update-a-scm-integration-link
 * @property {?String} branch
 * @property {?Boolean} auto_deploy_enabled
 * @property {?Boolean} deploy_review_apps_enabled
 * @property {?Boolean} delete_on_close_enabled
 * @property {?Number} hours_before_delete_on_close
 * @property {?Boolean} delete_stale_enabled
 * @property {?Number} hours_before_delete_stale
 */
