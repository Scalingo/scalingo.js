import { Client } from "..";
import { Alert, AlertWithNotifiers } from "../models/regional/alerts";
import { CreateParams, UpdateParams } from "../params/regional/alerts";
/**
 * Alerts API Client
 */
export default class Alerts {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * List all the alerts of an application
     * @see https://developers.scalingo.com/alerts#list-alerts-of-an-app
     * @param appId ID of the app to get alerts list
     */
    for(appId: string): Promise<AlertWithNotifiers[]>;
    /**
     * Find an alert
     * @see https://developers.scalingo.com/alerts#list-alerts-of-an-app
     * @param appId ID of the app
     * @param alertId ID of the alert
     */
    find(appId: string, alertId: string): Promise<Alert>;
    /**
     * Create an alert for an application
     * @see https://developers.scalingo.com/alerts#create-a-new-alert
     * @param appId ID of the app
     * @param opts Payload of the alert
     */
    create(appId: string, opts?: CreateParams): Promise<Alert>;
    /**
     * Update an alert
     * @see https://developers.scalingo.com/alerts#update-an-alert
     * @param appId ID of the app
     * @param alertId ID of the alert
     * @param opts Payload of the alert
     */
    update(appId: string, alertId: string, opts?: UpdateParams): Promise<Alert>;
    /**
     * Destroy an alert
     * @see https://developers.scalingo.com/alerts#delete-an-alert
     * @param appId ID of the app
     * @param alertId ID of the alert
     */
    destroy(appId: string, alertId: string): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map