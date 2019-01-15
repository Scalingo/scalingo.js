import {unpackData} from '../utils.js'

export default class Containers {
  /**
   * Create a new Client for the Containers API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client;
  }

  /**
   * Get container formation for an app
   * @see http://developers.scalingo.com/apps#get-containers-list<Paste>
   * @param {String} appId ID of the app to get the formation from
   * @return {Promise< Container[] | APIError>}
   */
  for(appId) {
    return unpackData(this._client.apiClient().get(`/apps/${appId}/containers`), "containers")
  }

  /**
   * Scale an application
   * @see http://developers.scalingo.com/apps#scale-an-application
   * @param {String} appId ID of the app to scale
   * @param {Container[]} formation Formation to apply
   * @return {Promise<Container[] | APIError>} final formation
   */
  scale(appId, formation) {
    return unpackData(this._client.apiClient().post(`/apps/${appId}/scale`, {containers: formation}), "containers")
  }
}

/**
 * @typedef {Object} Container
 * @property {String} name Type of container (web, worker, etc.)
 * @property {number} amount Amount of containers of the given type
 * @property {String} size Size of the containers of this type (S/M/XL/..)
 */

