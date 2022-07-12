import { Client } from "..";
import { Operation } from "./utils";
/**
 * Operations API Client
 */
export default class Operations {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * Get an operation
     * @see https://developers.scalingo.com/operations#get-an-operation
     * @param appId ID of the application
     * @param operationId ID of the operation
     */
    operation(appId: string, operationId: string): Promise<Operation>;
}
//# sourceMappingURL=index.d.ts.map