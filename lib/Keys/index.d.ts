import { Client } from "..";
import { Key } from "../models/auth/keys";
/**
 * Keys API Client
 */
export default class Keys {
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
    all(): Promise<Key[]>;
    /**
     * Show one specific key
     */
    show(id: string): Promise<Key>;
    /**
     * Create a new key
     * @param name The name of the new key
     * @param content Public SSH key content (ie. content of ~/.ssh/id_rsa.pub)
     */
    create(name: string, content: string): Promise<Key>;
    /**
     * Destroy a key
     * @param id The id of the key to destroy
     */
    destroy(id: string): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map