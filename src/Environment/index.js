import {unpackData} from "../utils";

/**
 * Environment API Client
 */
export default class Environment {
  /**
   * Create a new Client for the Environment API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client;
  }
  
  /**
   * List all the environment variables of an application
   * @see http://developers.scalingo.com/environment#list-environment-variables-of-an-app
   * @param {String} appId ID of the app to get domains list
   * @return {Promise<Variable[] | APIError>}
   */
  for(appId) {
    return unpackData(this._client.apiClient().get(`/apps/${appId}/variables`), "variables")
  }
  
  /**
   * Create an environment variables for an application
   * @see http://developers.scalingo.com/environment#add-environment-variables-to-an-app
   * @param {String} appId ID of the app to get domains list
   * @param {VariableParams} variable An Object that contain the information about the environment variable
   * @return {Promise<Variable | APIError>}
   */
  create(appId, variable) {
    return unpackData(this._client.apiClient().post(`/apps/${appId}/variables`, {variable: variable}), "variable")
  }
}

/**
 * @typedef {Object} Variable
 * @property {String} id Unique ID of the environment variable
 * @property {String} appId Unique ID of the application
 * @property {String} name Name of the environment variable
 * @property {String} value The value of the environment variable
 * @see http://developers.scalingo.com/environment
 */

/**
 * @typedef {Object} VariableParams
 * @property {String} name The name of the environment variable
 * @property {String} value The value of the environment variable
 * @see http://developers.scalingo.com/environment#add-environment-variables-to-an-app
 */
