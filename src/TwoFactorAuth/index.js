import { unpackData } from '../utils'

export const TOTP_PROVIDER = 'totp'
export const DEFAULT_PROVIDER = TOTP_PROVIDER
export const SUPPORTED_PROVIDERS = [TOTP_PROVIDER]

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
   * @return {Promise<TwoFactorAuthObject | APIError>} Promise resolving with the current user two factor status
   */
  status() {
    return unpackData(this._client.authApiClient().get('/client/tfa'), 'tfa')
  }

  /**
   * Initiate the two-factor activation process.
   * @param {?String} [provider=totp] the 2FA provider
   * @return {Promise<TwoFactorAuthInitiateResponse | APIError>} Promise resolving with the current user two factor status
   */
  initiate(provider) {
    const data = {
      tfa: { provider: provider || DEFAULT_PROVIDER },
    }

    return unpackData(
      this._client.authApiClient().post('/client/tfa', data),
      'tfa',
    )
  }

  /**
   * Validate the two-factor activation process.
   * @param {Number} attempt the "pin number" given by the authenticator
   * @return {Promise<TwoFactorAuthValidateResponse | APIError>} Promise resolving with the current user two factor status
   */
  validate(attempt) {
    const data = {
      tfa: { attempt },
    }

    return unpackData(
      this._client.authApiClient().post('/client/tfa/validate', data),
      'tfa',
    )
  }

  /**
   * Disable the two-factor auth for this user. Will raise an error if not enabled.
   * @return {Promise<TwoFactorAuthObject | APIError>} Promise resolving with the current user two factor status
   */
  disable() {
    return unpackData(this._client.authApiClient().delete('/client/tfa'))
  }
}

/**
 * @typedef {Object} TwoFactorAuthObject
 * @property {String} uuid
 * @property {Boolean} enabled
 * @property {?String} provider
 */

/**
 * @typedef {Object} TwoFactorAuthInitiateResponse
 * @property {String} uuid
 * @property {Boolean} enabled
 * @property {String} provider
 * @property {String} uri
 */

/**
 * @typedef {Object} TwoFactorAuthValidateResponse
 * @property {Array<String>} codes A list of recovery codes
 * @property {TwoFactorAuth} user The two factor auth status
 */
