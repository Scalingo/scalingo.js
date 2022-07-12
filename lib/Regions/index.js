import { unpackData } from "../utils";
/**
 * Regions API Client
 */
export default class Regions {
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client) {
        this._client = client;
    }
    /**
     * List all known keys
     */
    all() {
        return unpackData(this._client.authApiClient().get("/regions"), "regions");
    }
}
//# sourceMappingURL=index.js.map