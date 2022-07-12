import { unpackData } from "../utils";
/**
 * Cron tasks API Client
 */
export default class CronTasks {
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client) {
        this._client = client;
    }
    /**
     * Get cron tasks for an app
     * @param appId ID of the app to get the formation from
     */
    for(appId) {
        return unpackData(this._client.apiClient().get(`/apps/${appId}/cron_tasks`));
    }
}
//# sourceMappingURL=index.js.map