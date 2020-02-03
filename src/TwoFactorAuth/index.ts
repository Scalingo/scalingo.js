import { unpackData } from '@/utils'
import { Client, APIResponse } from '..'

export const TOTP_PROVIDER = 'totp'
export const DEFAULT_PROVIDER = TOTP_PROVIDER
export const SUPPORTED_PROVIDERS = [TOTP_PROVIDER]

export interface TwoFactorAuthObject {
  uuid: string
  enabled: boolean
  provider?: 'totp'
}

export interface TwoFactorAuthInitiateResponse {
  uuid: string
  enabled: boolean
  provider: string
  uri: string
}

export interface TwoFactorAuthValidateResponse {
  /** A list of recovery codes */
  codes: string[]

  /** The two factors auth status */
  user: TwoFactorAuth
}

export class TwoFactorAuth {
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
   * Returns the current user two-factor status
   * @return Promise resolving with the current user two factor status
   */
  status(): APIResponse<TwoFactorAuthObject> {
    return unpackData(this._client.authApiClient().get('/client/tfa'), 'tfa')
  }

  /**
   * Initiate the two-factor activation process.
   * @param provider the 2FA provider
   * @return Promise resolving with the current user two factor status
   */
  initiate(
    provider = DEFAULT_PROVIDER,
  ): APIResponse<TwoFactorAuthInitiateResponse> {
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
   * @param attempt the "pin number" given by the authenticator
   * @return Promise resolving with the current user two factor status
   */
  validate(attempt: number): APIResponse<TwoFactorAuthValidateResponse> {
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
   * @return Promise resolving with the current user two factor status
   */
  disable(): APIResponse<TwoFactorAuthObject> {
    return unpackData(this._client.authApiClient().delete('/client/tfa'))
  }
}

export default TwoFactorAuth
