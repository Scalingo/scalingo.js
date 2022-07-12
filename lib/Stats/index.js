import { unpackData } from "../utils";
/**
 * Stats API Client
 */
export class Stats {
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client) {
        this._client = client;
    }
    /**
     * Return referrals stats for current user
     * @return The referrals stats for the current user
     */
    referrals() {
        return unpackData(this._client.apiClient().get("/account/referrals/stats"), "referral_stats");
    }
}
export default Stats;
//# sourceMappingURL=index.js.map