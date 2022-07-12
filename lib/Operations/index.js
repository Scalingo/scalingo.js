import { unpackData } from "../utils";
/**
 * Operations API Client
 */
export default class Operations {
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client) {
        this._client = client;
    }
    /**
     * Get an operation
     * @see https://developers.scalingo.com/operations#get-an-operation
     * @param appId ID of the application
     * @param operationId ID of the operation
     */
    operation(appId, operationId) {
        return unpackData(this._client.apiClient().get(`/apps/${appId}/operations/${operationId}`), "operation");
    }
}
//# sourceMappingURL=index.js.map