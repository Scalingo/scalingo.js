import {unpackData} from '../utils'
/**
 * Deployment API Client
 */

export default class Deployments {
  /**
   * Create a new Client for the Deployment API
   * @param {Client} client Scalingo API Client
   */
  constructor(client) {
    this._client = client;
  }

  /**
   * List all deployments for an app
   * @see http://developers.scalingo.com/deployments#list-the-deployments-of-an-app
   * @param {String} appId ID of the app
   * @param {PaginationOpts} opts optional parameters
   * @return {Promise<DeploymentsResult[] | APIError>} List of deployments for this app
   */
  for(appId, opts) {
    return unpackData(this._client.apiClient().get(`/apps/${appId}/deployments`, {params: opts}))
  }

  /**
   * Get a deployment of an app
   * @see http://developers.scalingo.com/deployments#get-a-particular-deployment
   * @param {String} appId ID of the app
   * @param {String} deploymentId ID of the deployment
   * @return {Promise<Deployment | APIError>} Details of the deployment
   */
  find(appId, deploymentId) {
    return unpackData(this._client.apiClient().get(`/apps/${appId}/deployments/${deploymentId}`), "deployment")
  }

  /**
   * Get the logs of a deployment
   * @see http://developers.scalingo.com/deployments#get-the-output-of-the-deployment
   * @param {String} appId ID of the app
   * @param {String} deploymentId ID of the deployment
   * @return {Promise<String | APIError>} Logs of the deployment
   */
  logs(appId, deploymentId) {
    return unpackData(this._client.apiClient().get(`/apps/${appId}/deployments/${deploymentId}/output`))
  }
}

/**
 * @typedef {Object} Deployment
 * @see http://developers.scalingo.com/deployments
 * @property {String} id unique ID
 * @property {String} app_id unique ID referencing the app this deployment belongs to
 * @property {Date} created_at date of creation
 * @property {DeploymentStatus} status status of the deployment (building, success, aborted, *-error)
 * @property {String} git_ref git SHA
 * @property {DeploymentPusher} pusher embedded user who pushed the GIT reference
 * @property {DeploymentLinks} links hypermedia links about the deployment
 */

/**
 * @typedef {Object} DeploymentPusher
 * @see http://developers.scalingo.com/deployments
 * @property {String} id unique ID
 * @property {String} email email of user who pushed
 * @property {String} username username on Scalingo's platform
 */

/**
 * @typedef {Object} DeploymentLinks
 * @see http://developers.scalingo.com/deployments
 * @property {String} output URL to the logs of the deployment
 */

/**
 * @typedef {Object} DeploymentsResult
 * @property {Deployment[]} deployments List of deployments
 * @property {DeploymentsMeta} meta metadata linked to this request
 */

/**
 * @typedef {Object} DeploymentsMeta
 * @property {PaginationMeta} pagination Pagination metadata
 */

/**
 * @typedef {String} DeploymentStatus
 * @desc
 * Can take the following values:
 * - **building**: when the buildpack is chosen and executed
 * - **pushing**: the generated Docker image is pushed to our registry
 * - **starting**: the order to start your app has been transmitted to our scheduler
 * - **success**: the application has correctly started, end of deployment
 * - **crashed-error**: the application failed to boot, have a look to the logs
 * - **timeout-error**: the application has not started in 60 seconds
 * - **build-error**: something went wrong during the buildpack execution, have a look at deployments logs
 * - **aborted**: if the connection is broken between the pusher and our infrastructure, the deployment is considered as canceled.
 */
