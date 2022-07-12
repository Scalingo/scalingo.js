import { Client } from "..";
import { TwoFactorAuthObject, TwoFactorAuthInitiateResponse, TwoFactorAuthValidateResponse } from "../models/auth/two_factor_auth";
export declare class TwoFactorAuth {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * Returns the current user two-factor status
     * @return Promise resolving with the current user two factor status
     */
    status(): Promise<TwoFactorAuthObject>;
    /**
     * Initiate the two-factor activation process.
     * @param provider the 2FA provider
     * @return Promise resolving with the current user two factor status
     */
    initiate(provider?: string): Promise<TwoFactorAuthInitiateResponse>;
    /**
     * Validate the two-factor activation process.
     * @param attempt the "pin number" given by the authenticator
     * @return Promise resolving with the current user two factor status
     */
    validate(attempt: number): Promise<TwoFactorAuthValidateResponse>;
    /**
     * Disable the two-factor auth for this user. Will raise an error if not enabled.
     * @return Promise resolving with the current user two factor status
     */
    disable(): Promise<TwoFactorAuthObject>;
}
export default TwoFactorAuth;
//# sourceMappingURL=index.d.ts.map