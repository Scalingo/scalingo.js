import { unpackData } from '../utils'

/**
 * Operations API Client
 */
export default class Operations {
  /**
   * Create a new Client for the Containers API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client
  }

  /**
   * Get an operation
   * @see https://developers.scalingo.com/operations#get-an-operation
   * @param {String} appId ID of the application
   * @param {String} operationId ID of the operation
   * @return {Promise<Operation | APIError>}
   */
  operation(appId, operationId) {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/operations/${operationId}`),
      'operation',
    )
  }
}

/**
 * @typedef {Object} Operation
 * {String} id Unique ID of the operation
 * {Date} created_at Creation date of the operation
 * {Date} finished_at Last time the application has been updated
 * {String} status Status of the operation
 * {String} type Type of operation
 * {String} error Text of the error if there is one
 */
