import axios from 'axios'
import {unpackData} from '../utils.js'

export default class Tokens {
  /**
   * Create a new Client for the Token API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client;
  }

  /**
   * Exchange a Token for a JWT
   * @param {!String} token A valid token
   * @return {Promise<String| Error>} A valid Bearer Token that can be used against our infrastructure.
   */
  exchange(token) {
    let request = axios.post(`${this._client._authApiUrl}/v1/tokens/exchange`, {}, {
      "auth": {
        "user": "",
        "password": token,
      }
    })
    return unpackData(request, "token")
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
