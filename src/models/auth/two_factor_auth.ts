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
  user: TwoFactorAuthObject
}
