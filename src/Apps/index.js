import {unpackData} from '../utils.js'

/**
 * Apps API Client
 */
export default class Apps{
  /**
   * Create a new Client for the App API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client;
  }

  /**
   * Fetch a specific app
   * @see http://developers.scalingo.com/apps#get-a-precise-application
   * @param {String} id - ID of the application
   * @return {Promise<App,APIError>} Promise that when resolved return an App. See: http://developers.scalingo.com/apps#application-attributes
   */
  find(id) {
    return unpackData(this._client.apiClient().get(`/apps/${id}`), "app")
  }

  /**
   * Get all your applications and the one your are collaborator for
   * @see http://developers.scalingo.com/apps#list-your-applications
   * @return {Promise<App[], APIError>} Promise that when resolved return an App array. See: http://developers.scalingo.com/apps#application-attributes
   */
  all() {
    return unpackData(this._client.apiClient().get('/apps'), "apps")
  }

  /**
   * Create a new application
   * @see https://developers.scalingo.com/apps#create-an-application
   * @param {String} name - Name of the application
   * @param {AppCreateOpts} opts - Optional additional information
   * @return {Promise<App, APIError>} Promise that when resolved returns the App created.
   */

  create(name, opts) {
    let body = {
      name: name,
    }

    let headers = {}

    if(opts) {
      body['git_source'] = opts['git_source']
      body['parent_id'] = opts['parent_id']
      body['stack_id'] = opts['stack_id']
      if(opts['dry_run']) {
        headers['X-Dry-Run'] = "true"
      }
    }
    return unpackData(this._client.apiClient().post('/apps', {app: body}, {headers}), "app")
  }
}


/**
 * @typedef {Object} App
 * @see http://developers.scalingo.com/apps
 * @property {String} id  unique ID
 * @property {String} name  name of the application, can substitute the ID
 * @property {Date} created_at creation date of the application
 * @property {Date} updated_at last time the application has been updated
 * @property {String} git_url URL to the GIT remote to access your application
 * @property {Object} owner information about the owner of the application
 * @property {String} url platform allocated URL to access to your app
 * @property {Object} links object of related link like deployments_stream
 * @property {Boolean} force_https activation of force HTTPS
 * @property {Boolean} sticky_session activation of sticky session
 * @property {Boolean} router_logs activation of the router logs in your app logs
 * @property {Date} last_deployed_at date of the last deployment attempt
 * @property {String} last_deployed_by user who attempted the last deployment
 * @property {String} last_deployment_id id of the last successful deployment
 */

/**
 * @typedef {Object} AppCreateOpts
 * @see https://developers.scalingo.com/apps#create-an-application
 * @property {?String} parent_id ID of the parent app (used to create child apps)
 * @property {?String} stack_id ID of the stack the application should use
 * @property {?Boolean} dry_run If set to true, the API will run the validations but wont create the app
 */
