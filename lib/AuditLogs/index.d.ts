import { Client } from "..";
import { AuditLog } from "../models/regional/audit_logs";
export default class AuditLogs {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * Get audit logs
     * @see https://developers.scalingo.com/audit_logs
     * @param appId ID of the application
     * @param id ID of the audit log
     * @return Promise that when resolved returns the audit logs
     */
    show(appId: string, id: string): Promise<AuditLog[]>;
}
//# sourceMappingURL=index.d.ts.map