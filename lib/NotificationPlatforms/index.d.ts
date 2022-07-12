import { Client } from "..";
import { NotificationPlatform } from "../models/regional/notification_platforms";
/**
 * Notification Platforms API Client
 */
export default class NotificationPlatforms {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * List notification platforms
     * @see https://developers.scalingo.com/notification_platforms
     */
    list(): Promise<NotificationPlatform>;
}
//# sourceMappingURL=index.d.ts.map