import { Client } from "..";
import { NotificationPlatform } from "../models/regional/notification_platforms";
import { unpackData } from "../utils";

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
  constructor(client: Client) {
    this._client = client;
  }

  /**
   * List notification platforms
   * @see https://developers.scalingo.com/notification_platforms
   */
  list(): Promise<NotificationPlatform> {
    return unpackData(
      this._client.unauthenticatedClient().get("/notification_platforms"),
      "notification_platforms",
    );
  }
}
