import { Client } from "..";
import { Token } from "../models/auth/tokens";
/**
 * Tokens API Client
 */
export declare class Tokens {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * List all known tokens
     * @return A list of tokens
     */
    all(): Promise<Token[]>;
    /**
     * Create a new token
     * @param name The name of the new token
     * @return The newly created token
     */
    create(name: string): Promise<Token>;
    /**
     * Renew a token
     * @param id The id of the token to renew
     * @return The newly created token
     */
    renew(id: string): Promise<Token>;
    /**
     * Destroy a token
     * @param id The id of the token to destroy
     */
    destroy(id: string): Promise<void>;
    /**
     * Exchange a Token for a JWT
     * @param token A valid token
     * @return A valid Bearer Token that can be used against our infrastructure.
     */
    exchange(token: string): Promise<string>;
}
export default Tokens;
//# sourceMappingURL=index.d.ts.map