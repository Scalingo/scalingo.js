import { unpackData } from "../utils";
export default class AuditLogs {
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client) {
        this._client = client;
    }
    /**
     * Get audit logs
     * @see https://developers.scalingo.com/audit_logs
     * @param appId ID of the application
     * @param id ID of the audit log
     * @return Promise that when resolved returns the audit logs
     */
    async show(appId, id) {
        return unpackData(this._client.apiClient().get(`/apps/${appId}/audit_logs/${id}`));
    }
}
//# sourceMappingURL=index.js.map