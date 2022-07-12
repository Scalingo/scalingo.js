import { Client } from "..";
import { Region } from "../models/auth";
/**
 * Regions API Client
 */
export default class Regions {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * List all known keys
     */
    all(): Promise<Region[]>;
}
//# sourceMappingURL=index.d.ts.map