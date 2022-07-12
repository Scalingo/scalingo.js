import { Client } from "..";
import { ReferralsStats } from "../models/regional/stats";
/**
 * Stats API Client
 */
export declare class Stats {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * Return referrals stats for current user
     * @return The referrals stats for the current user
     */
    referrals(): Promise<ReferralsStats>;
}
export default Stats;
//# sourceMappingURL=index.d.ts.map