import axios from 'axios'
import { unpackData } from '../utils.js'

/**
 * Tokens API Client
 */
export default class Tokens {
  /**
   * Create a new Client for the Token API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client
  }

  /**
   * List all known tokens
   * @return {Promise<Token[] | APIError>} A list of tokens
   */
  list() {
    return unpackData(this._client.authApiClient().get('/tokens'), 'tokens')
  }

  /**
   * Create a new token
   * @param {String} name - The name of the new token
   * @return {Promise<Token | APIError>} The newly created token
   */
  create(name) {
    return unpackData(
      this._client.authApiClient().post('/tokens', { name }, null),
      'token',
    )
  }

  /**
   * Renew a token
   * @param {String} id - The id of the token to renew
   * @return {Promise<Token | APIError>} The newly created token
   */
  renew(id) {
    return unpackData(
      this._client.authApiClient().patch(`/tokens/${id}/renew`, null, null),
      'token',
    )
  }

  /**
   * Destroy a token
   * @param {String} id - The id of the token to destroy
   * @return {Promise<? | APIError>}
   */
  destroy(id) {
    return unpackData(this._client.authApiClient().delete(`/tokens/${id}`))
  }

  /**
   * Exchange a Token for a JWT
   * @param {!String} token A valid token
   * @return {Promise<String| APIError>} A valid Bearer Token that can be used against our infrastructure.
   */
  exchange(token) {
    const request = axios.post(
      `${this._client._authApiUrl}/v1/tokens/exchange`,
      {},
      {
        auth: {
          password: token,
        },
      },
    )
    return unpackData(request, 'token')
  }
}

/**
 * @typedef {Object} Token
 * @see https://developers.scalingo.com/tokens
 * @property {String} id ID of the token
 * @property {String} name Name of the token
 * @property {String} created_at Creation date of this token
 * @property {?String} last_used_at Date of the last usage of this token
 * @property {String} issued_at When was the token issued
 * @property {?String} token Actual token (only shown on token creation endpoint)
 */
