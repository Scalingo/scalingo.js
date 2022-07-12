export declare const TOTP_PROVIDER = "totp";
export declare const DEFAULT_PROVIDER = "totp";
export declare const SUPPORTED_PROVIDERS: string[];
export interface TwoFactorAuthObject {
    uuid: string;
    enabled: boolean;
    provider?: "totp";
}
export interface TwoFactorAuthInitiateResponse {
    uuid: string;
    enabled: boolean;
    provider: string;
    uri: string;
}
export interface TwoFactorAuthValidateResponse {
    /** A list of recovery codes */
    codes: string[];
    /** The two factors auth status */
    user: TwoFactorAuthObject;
}
//# sourceMappingURL=two_factor_auth.d.ts.map