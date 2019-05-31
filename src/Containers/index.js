import {unpackData} from '../utils.js'
import {Operation} from "../Operations/utils";

/**
 * Containers API Client
 */
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
   * @see http://developers.scalingo.com/apps#get-containers-list
   * @param {String} appId ID of the app to get the formation from
   * @return {Promise<Container[] | APIError>}
   */
  for(appId) {
    return unpackData(this._client.apiClient().get(`/apps/${appId}/containers`), "containers")
  }

  /**
   * Scale an application
   * @see http://developers.scalingo.com/apps#scale-an-application
   * @param {String} appId ID of the app to scale
   * @param {Container[]} formation Formation to apply
   * @return {Promise<ContainersOperation | APIError>} final formation
   */
  async scale(appId, formation) {
    let result = await unpackData(this._client.apiClient().post(`/apps/${appId}/scale`, {containers: formation}), "containers", {hasOperation: true})
    let operation = new Operation(this._client, result.operation)
    await operation.refresh()
    return {formation: result.data, operation: operation}
  }
  
  /**
   * List the every sizes of the containers
   * @see http://developers.scalingo.com/container-sizes#list-the-container-sizes-available
   * @return {Promise<ContainerSize[] | APIError>} attributes of each container
   */
  availableSizes() {
    return unpackData(this._client.apiClient().get('/features/container_sizes'), "container_sizes")
  }
}

/**
 * @typedef {Object} ContainersOperation
 * @property {Object} formation Response of the API call
 * @property {Operation} operation Operation information
 */

/**
 * @typedef {Object} Container
 * @property {String} name Type of container (web, worker, etc.)
 * @property {number} amount Amount of containers of the given type
 * @property {String} size Size of the containers of this type (S/M/XL/..)
 */

/**
 * @typedef {Object} ContainerSize
 * @property {String} id Unique universal identifier
 * @property {String} name Name of the size
 * @property {String} human_name Display name of the type
 * @property {Number} ordinal Sorting index to display a list of sizes
 * @property {Number} hourly_price Price per hour of this container size in cents
 * @property {Number} thirtydays_price Price for 30 days in cents
 * @property {Number} memory RAM allocated to the containers in bytes
 * @property {String} human_cpu Human representation of the CPU priority
 */
