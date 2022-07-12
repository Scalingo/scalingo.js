import LogsListener from "../Logs/listener";
import { unpackData } from "../utils";
export default class Logs {
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client) {
        this._client = client;
    }
    /**
     * Get application logs
     * @see https://developers.scalingo.com/logs
     * @param id ID of the application
     * @param opts Optional additional information
     * @return Promise that when resolved returns the application logs
     */
    async for(id, opts) {
        let url = await this._client.Apps.logsURL(id);
        url = `${url}&stream=false`;
        if (opts && opts["count"]) {
            url = `${url}&n=${opts["count"]}`;
        }
        return unpackData(this._client.unauthenticatedClient().get(url));
    }
    /**
     * Open a listener on this app logs
     * @see https://developers.scalingo.com/logs
     * @param {String} id ID of the application
     * @return {Promise<LogsListener>} Promise that when resolved returns a logs listener for this application.
     */
    async listenerFor(id) {
        let url = await this._client.Apps.logsURL(id);
        url = `${url}&stream=true`;
        return new LogsListener(this._client, url);
    }
    /**
     * Get logs archives for an app
     * @see https://developers.scalingo.com/apps#access-to-the-application-logs-archives
     * @param id ID of the application
     * @return Promise that when resolved returns a list of logs archives for this application
     */
    archives(id, cursor) {
        const params = {};
        if (cursor !== null && cursor !== undefined)
            params.cursor = cursor;
        return unpackData(this._client.apiClient().get(`/apps/${id}/logs_archives`, { params }));
    }
}
//# sourceMappingURL=index.js.map