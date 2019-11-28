import { unpackData } from '../utils.js'

/**
 * Features API Client
 */
export default class Features {
  /**
   * Create a new Client for the Features API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client
  }

  /**
   * Get a list of container sizes
   * @see https://developers.scalingo.com/container_sizes#list-the-container-sizes-available
   * @return {Promise<ContainerSize[]| APIError>} A valid Bearer Token that can be used against our infrastructure.
   */
  containerSizes() {
    return unpackData(
      this._client.apiClient().get(`/features/container_sizes`),
      'container_sizes',
    )
  }
}

/**
 * @typedef {Object} ContainerSize
 * @property {String} id Unique Universal Identifier
 * @property {String} name Name of the size, used as parameter in operations
 * @property {String} human_name Display name of the type
 * @property {Integer} ordinal Sorting index to display a list of sizes
 * @property {Integer} hourly_price Price per hour of this container size in cents
 * @property {Integer} thirtydays_price Price for 30 days in cents
 * @property {Integer} memory RAM allocated to the containers in bytes
 * @property {String} human_cpu Human representation of the CPU priority
 */
