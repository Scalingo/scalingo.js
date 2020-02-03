import { unpackData } from '../utils'
import { Client, APIResponse } from '..'

/** @see https://developers.scalingo.com/keys */
export interface Key {
  /** Unique key ID */
  id: string
  /** Key name */
  name: string
  /** Content of the SSH key */
  content: string
  /** Fingerprint of the SSH key */
  fingerprint: string
  /** Creation date of the SSH Key */
  created_at: string
  /** Owner of the SSH key */
  owner: Record<string, any>
}

/**
 * Keys API Client
 */
export default class Keys {
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
   * List all known keys
   */
  all(): APIResponse<Key[]> {
    return unpackData(this._client.authApiClient().get('/keys'), 'keys')
  }

  /**
   * Show one specific key
   */
  show(id: string): APIResponse<Key> {
    return unpackData(this._client.authApiClient().get(`/keys/${id}`), 'key')
  }

  /**
   * Create a new key
   * @param name The name of the new key
   * @param content Public SSH key content (ie. content of ~/.ssh/id_rsa.pub)
   */
  create(name: string, content: string): APIResponse<Key> {
    const data = { name, content }
    return unpackData(this._client.authApiClient().post('/keys', data), 'key')
  }

  /**
   * Destroy a key
   * @param id The id of the key to destroy
   */
  destroy(id: string): APIResponse {
    return unpackData(this._client.authApiClient().delete(`/keys/${id}`))
  }
}
