import { Client } from "..";
import { Database, DashboardDatabase } from "../models/regional/databases";
import { unpackData } from "../utils";

/**
 * Databases API Client
 */
export default class Databases {
  /** Scalingo API Client */
  _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Create a new database
   * @see https://developers.scalingo.com/databases#provision-a-database
   * @param opts Object with necessary and optionnal params
   * @param opts.addon_provider_id ID of the addon provider
   * @param opts.plan_id ID of the plan
   * @param opts.database_name Name of the database
   *
   * @return Promise that when resolved returns the new database.
   */

  create(opts: {
    addon_provider_id: string;
    plan_id: string;
    database_name: string;
    project_id?: string;
  }): Promise<Database[] | DashboardDatabase[]> {
    return unpackData(
      this._client.apiClient().post("/databases", { params: opts }),
      "apps",
    );
  }
}
