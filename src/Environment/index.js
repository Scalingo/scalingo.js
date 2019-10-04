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
   * @see https://developers.scalingo.com/environment#list-environment-variables-of-an-app
   * @param {String} appId ID of the app to get domains list
   * @return {Promise<Variable[] | APIError>}
   */
  for(appId) {
    return unpackData(this._client.apiClient().get(`/apps/${appId}/variables`), "variables")
  }
  
  /**
   * Create an environment variable for an application
   * @see https://developers.scalingo.com/environment#add-environment-variables-to-an-app
   * @param {String} appId ID of the app to get domains list
   * @param {VariableParams} variable An Object that contain the information about the environment variable
   * @return {Promise<Variable | APIError>}
   */
  create(appId, variable) {
    return unpackData(this._client.apiClient().post(`/apps/${appId}/variables`, {variable: variable}), "variable")
  }
  
  /**
   * Create or update multiple environment variables for an application
   * @see https://developers.scalingo.com/environment#bulk-update-of-the-environment-of-an-app
   * @param {String} appId ID of the app to get domains list
   * @param {VariableParams[]} variablesArray An array of Object that contain the information about the environment variables to update
   * @return {Promise<Variable[] | APIError>}
   */
  bulkUpdate(appId, variablesArray) {
    return unpackData(this._client.apiClient().put(`/apps/${appId}/variables`, {variables: variablesArray}), "variables")
  }
  
  /**
   * Update an environment variable
   * @see https://developers.scalingo.com/environment#update-an-environment-variable
   * @param {String} appId ID of the app to get domains list
   * @param {String} id ID of the variable to update
   * @param {String} variable An string of the value of the environment variable to update
   * @return {Promise<Variable[] | APIError>}
   */
  update(appId, id, variable) {
    return unpackData(this._client.apiClient().patch(`/apps/${appId}/variables/${id}`, {variable: {value: variable}}), "variable")
  }
  
  /**
   * Delete an environment variable
   * @see https://developers.scalingo.com/environment#delete-an-environment-variable
   * @param {String} appId ID of the app to get domains list
   * @param {String} variableId ID of the variable to delete
   * @return {Promise<Variable[] | APIError>}
   */
  destroy(appId, variableId) {
    return unpackData(this._client.apiClient().delete(`/apps/${appId}/variables/${variableId}`))
  }
  
  /**
   * Delete multiple environment variables
   * @see https://developers.scalingo.com/environment#bulk-delete-environment-variables-of-an-app
   * @param {String} appId ID of the app
   * @param {String[]} variablesArray An array of variables id
   * @return {Promise<Variable[] | APIError>}
   */
  bulkDestroy(appId, variablesArray) {
    return unpackData(this._client.apiClient().delete(`/apps/${appId}/variables`, {data: {variable_ids: variablesArray}}))
  }
}

/**
 * @typedef {Object} Variable
 * @property {String} id Unique ID of the environment variable
 * @property {String} name Name of the environment variable
 * @property {String} value The value of the environment variable
 * @see https://developers.scalingo.com/environment
 */

/**
 * @typedef {Object} VariableParams
 * @property {String} name The name of the environment variable
 * @property {String} value The value of the environment variable
 * @see https://developers.scalingo.com/environment#add-environment-variables-to-an-app
 */
