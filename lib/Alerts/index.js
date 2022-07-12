import { unpackData } from "../utils";
/**
 * Alerts API Client
 */
export default class Alerts {
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client) {
        this._client = client;
    }
    /**
     * List all the alerts of an application
     * @see https://developers.scalingo.com/alerts#list-alerts-of-an-app
     * @param appId ID of the app to get alerts list
     */
    for(appId) {
        return unpackData(this._client.apiClient().get(`/apps/${appId}/alerts`), "alerts");
    }
    /**
     * Find an alert
     * @see https://developers.scalingo.com/alerts#list-alerts-of-an-app
     * @param appId ID of the app
     * @param alertId ID of the alert
     */
    find(appId, alertId) {
        return unpackData(this._client.apiClient().get(`/apps/${appId}/alerts/${alertId}`), "alert");
    }
    /**
     * Create an alert for an application
     * @see https://developers.scalingo.com/alerts#create-a-new-alert
     * @param appId ID of the app
     * @param opts Payload of the alert
     */
    create(appId, opts = {}) {
        const data = { alert: opts };
        return unpackData(this._client.apiClient().post(`/apps/${appId}/alerts`, data), "alert");
    }
    /**
     * Update an alert
     * @see https://developers.scalingo.com/alerts#update-an-alert
     * @param appId ID of the app
     * @param alertId ID of the alert
     * @param opts Payload of the alert
     */
    update(appId, alertId, opts = {}) {
        const data = { alert: opts };
        return unpackData(this._client.apiClient().patch(`/apps/${appId}/alerts/${alertId}`, data), "alert");
    }
    /**
     * Destroy an alert
     * @see https://developers.scalingo.com/alerts#delete-an-alert
     * @param appId ID of the app
     * @param alertId ID of the alert
     */
    destroy(appId, alertId) {
        return unpackData(this._client.apiClient().delete(`/apps/${appId}/alerts/${alertId}`));
    }
}
//# sourceMappingURL=index.js.map