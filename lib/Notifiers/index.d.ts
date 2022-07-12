import { Client } from "..";
import { Notifier } from "../models/regional/notifiers";
import { CreateParams, UpdateParams } from "../params/regional/notifiers";
/**
 * Notifiers API Client
 */
export default class Notifiers {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * Get list of notifiers of an application
     * @see https://developers.scalingo.com/notifiers#list-application-notifiers
     * @param appId ID of the app to get the notifiers from
     */
    for(appId: string): Promise<Notifier[]>;
    /**
     * Add a notifier to an application
     * @see https://developers.scalingo.com/notifiers#add-a-notifier
     * @param appId ID of the app
     * @param notifier New notifier configuration
     */
    create(appId: string, notifier: CreateParams): Promise<Notifier>;
    /**
     * Upgrade a notifier
     * @see https://developers.scalingo.com/notifiers#update-a-notifier
     * @param appId ID of the current application
     * @param notifierId ID of the current notifier
     * @param notifier Updated notifier configuration
     */
    update(appId: string, notifierId: string, notifier: UpdateParams): Promise<Notifier>;
    /**
     * Remove a notifier
     * @see https://developers.scalingo.com/notifiers#remove-a-notifier
     * @param appId ID of the current application
     * @param notifierId ID of the notifier
     */
    destroy(appId: string, notifierId: string): Promise<void>;
    /**
     * Send a test notification to the notifier
     * @see https://developers.scalingo.com/notifiers#test-a-notifier
     * @param appId The ID of the current application
     * @param notifierId The ID of the notifier
     */
    test(appId: string, notifierId: string): Promise<void>;
    /**
     * Get a specific notifier
     * @param {String} appId The ID of the current application
     * @param {String} notifierId The ID of the notifier to get
     */
    get(appId: string, notifierId: string): Promise<Notifier>;
}
//# sourceMappingURL=index.d.ts.map