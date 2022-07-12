import { Client } from "..";
import { CronDefinition } from "../models/regional/cron_tasks";
/**
 * Cron tasks API Client
 */
export default class CronTasks {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * Get cron tasks for an app
     * @param appId ID of the app to get the formation from
     */
    for(appId: string): Promise<CronDefinition>;
}
//# sourceMappingURL=index.d.ts.map