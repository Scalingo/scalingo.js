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
   * @return {Promise<Variables[] | APIError>}
   */
  for(appId) {
    return unpackData(this._client.apiClient().get(`/apps/${appId}/variables`), "variables")
  }
}

/**
 * @typedef {Object} Variables
 * @property {String} variableId Unique ID of the environment variable
 * @property {String} appId Unique ID of the application
 * @property {String} name Name of the environment variable
 * @property {String} value The value of the environment variable
 * @see http://developers.scalingo.com/environment
 */
