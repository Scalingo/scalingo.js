import { Client } from "..";
import { CronDefinition } from "../models/regional/cron_tasks";
import { unpackData } from "../utils";

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
  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Get cron tasks for an app
   * @param appId ID of the app to get the formation from
   */
  for(appId: string): Promise<CronDefinition> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/cron_tasks`)
    );
  }
}
