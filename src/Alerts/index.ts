import { unpackData } from "../utils";
import { Client } from "..";
import { Alert } from "../models/regional/alerts";

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
  constructor(client: Client) {
    this._client = client;
  }

  /**
   * List all the alerts of an application
   * @see https://developers.scalingo.com/alerts#list-alerts-of-an-app
   * @param appId ID of the app to get alerts list
   */
  for(appId: string): Promise<Alert[]> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/alerts`),
      "alerts"
    );
  }
}
