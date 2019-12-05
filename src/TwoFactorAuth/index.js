import { unpackData } from '../utils.js'

export default class TwoFactorAuth {
  /**
   * Create a new Client for the Users API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client
  }

  /**
   * Returns the current user two-factor status
   * @return {Promise<TwoFactorAuth | APIError>} Promise resolving with the current user two factor status
   */
  status() {
    return unpackData(this._client.authApiClient().get('/client/tfa'), 'tfa')
  }

/**
 * @typedef {Object} TwoFactorAuth
 * @property {String} id
 * @property {String} uuid
 * @property {Boolean} enabled
 * @property {?String} provider
 */
