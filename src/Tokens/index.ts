import axios from 'axios'
import { unpackData } from '../utils'
import { Client } from '..'

import { Token } from '../models/auth/tokens'

/**
 * Tokens API Client
 */
export class Tokens {
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
   * List all known tokens
   * @return A list of tokens
   */
  all(): Promise<Token[]> {
    return unpackData(this._client.authApiClient().get('/tokens'), 'tokens')
  }

  /**
   * Create a new token
   * @param name The name of the new token
   * @return The newly created token
   */
  create(name: string): Promise<Token> {
    return unpackData(
      this._client.authApiClient().post('/tokens', { name }),
      'token',
    )
  }

  /**
   * Renew a token
   * @param id The id of the token to renew
   * @return The newly created token
   */
  renew(id: string): Promise<Token> {
    return unpackData(
      this._client.authApiClient().patch(`/tokens/${id}/renew`),
      'token',
    )
  }

  /**
   * Destroy a token
   * @param id The id of the token to destroy
   */
  destroy(id: string): Promise<void> {
    return unpackData(this._client.authApiClient().delete(`/tokens/${id}`))
  }

  /**
   * Exchange a Token for a JWT
   * @param token A valid token
   * @return A valid Bearer Token that can be used against our infrastructure.
   */
  exchange(token: string): Promise<string> {
    const request = axios.post(
      `${this._client._authApiUrl}/v1/tokens/exchange`,
      {},
      {
        auth: {
          username: '',
          password: token,
        },
      },
    )
    return unpackData(request, 'token')
  }
}

export default Tokens
