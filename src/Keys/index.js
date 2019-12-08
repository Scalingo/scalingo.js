import { unpackData } from '../utils.js'

/**
 * Keys API Client
 */
export default class Keys {
  /**
   * Create a new Client for the Keys API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client
  }

  /**
   * List all known keys
   * @return {Promise<Key[] | APIError>} A list of keys
   */
  all() {
    return unpackData(this._client.apiClient().get('/keys'), 'keys')
  }

  /**
   * Show one specific key
   * @return {Promise<Key | APIError>} A key
   */
  show(id) {
    return unpackData(this._client.apiClient().get(`/keys/${id}`), 'key')
  }

  /**
   * Create a new key
   * @param {String} name - The name of the new key
   * @param {String} content - Public SSH key content (ie. content of ~/.ssh/id_rsa.pub)
   * @return {Promise<Key | APIError>} The newly created key
   */
  create(name, content) {
    const data = { name, content }
    return unpackData(this._client.apiClient().post('/keys', data, null), 'key')
  }

  /**
   * Destroy a key
   * @param {String} id - The id of the key to destroy
   * @return {Promise<? | APIError>}
   */
  destroy(id) {
    return unpackData(this._client.apiClient().delete(`/keys/${id}`))
  }
}

/**
 * @typedef {Object} Key
 * @see https://developers.scalingo.com/scm_integrations#createlink-an-scm-integration-with-your-account
 * @property {String} id Unique key ID
 * @property {String} name Key name
 * @property {String} content
 * @property {String} fingerprint Fingerprint of the SSH key
 * @property {Date} created_at Creation date of the SCM integration
 * @property {Object} owner Owner of the SSH key
 */
