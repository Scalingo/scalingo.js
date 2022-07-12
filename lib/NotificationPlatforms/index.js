import { unpackData } from "../utils";
/**
 * Notification Platforms API Client
 */
export default class NotificationPlatforms {
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client) {
        this._client = client;
    }
    /**
     * List notification platforms
     * @see https://developers.scalingo.com/notification_platforms
     */
    list() {
        return unpackData(this._client.unauthenticatedClient().get("/notification_platforms"), "notification_platforms");
    }
}
//# sourceMappingURL=index.js.map