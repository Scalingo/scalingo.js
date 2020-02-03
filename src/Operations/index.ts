import { unpackData } from '../utils'
import { Client, APIResponse } from '..'
import { Operation } from './utils'

/**
 * Operations API Client
 */
export default class Operations {
  /** Scalingo API Client */
  _client: Client

  /**
   * Create a new "thematic" client
   * @param client Scalingo API Client
   */
  constructor(client: Client) {
    this._client = client
  }

  /**
   * Get an operation
   * @see https://developers.scalingo.com/operations#get-an-operation
   * @param appId ID of the application
   * @param operationId ID of the operation
   */
  operation(appId: string, operationId: string): APIResponse<Operation> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/operations/${operationId}`),
      'operation',
    )
  }
}
