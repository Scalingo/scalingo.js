import { unpackData } from "../utils";
/**
 * Keys API Client
 */
export default class Keys {
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
        return unpackData(this._client.authApiClient().get("/keys"), "keys");
    }
    /**
     * Show one specific key
     */
    show(id) {
        return unpackData(this._client.authApiClient().get(`/keys/${id}`), "key");
    }
    /**
     * Create a new key
     * @param name The name of the new key
     * @param content Public SSH key content (ie. content of ~/.ssh/id_rsa.pub)
     */
    create(name, content) {
        const data = { name, content };
        return unpackData(this._client.authApiClient().post("/keys", data), "key");
    }
    /**
     * Destroy a key
     * @param id The id of the key to destroy
     */
    destroy(id) {
        return unpackData(this._client.authApiClient().delete(`/keys/${id}`));
    }
}
//# sourceMappingURL=index.js.map