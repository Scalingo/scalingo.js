import { DEFAULT_PROVIDER, } from "../models/auth/two_factor_auth";
import { unpackData } from "../utils";
export class TwoFactorAuth {
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client) {
        this._client = client;
    }
    /**
     * Returns the current user two-factor status
     * @return Promise resolving with the current user two factor status
     */
    status() {
        return unpackData(this._client.authApiClient().get("/client/tfa"), "tfa");
    }
    /**
     * Initiate the two-factor activation process.
     * @param provider the 2FA provider
     * @return Promise resolving with the current user two factor status
     */
    initiate(provider = DEFAULT_PROVIDER) {
        const data = {
            tfa: { provider: provider || DEFAULT_PROVIDER },
        };
        return unpackData(this._client.authApiClient().post("/client/tfa", data), "tfa");
    }
    /**
     * Validate the two-factor activation process.
     * @param attempt the "pin number" given by the authenticator
     * @return Promise resolving with the current user two factor status
     */
    validate(attempt) {
        const data = {
            tfa: { attempt },
        };
        return unpackData(this._client.authApiClient().post("/client/tfa/validate", data), "tfa");
    }
    /**
     * Disable the two-factor auth for this user. Will raise an error if not enabled.
     * @return Promise resolving with the current user two factor status
     */
    disable() {
        return unpackData(this._client.authApiClient().delete("/client/tfa"));
    }
}
export default TwoFactorAuth;
//# sourceMappingURL=index.js.map