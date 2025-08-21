import { Client } from "..";
import {
  Database,
  DashboardDatabase,
  CreateParams,
} from "../models/regional/databases";
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
   * Get all databases for the current user
   * @param opts Object with optional params (ex: dashboard)
   * @return Promise that when resolved returns a Database array.
   */

  all(opts: { dashboard: true }): Promise<DashboardDatabase[]>;
  all(opts?: { dashboard?: false }): Promise<Database[]>;
  all(opts?: {
    dashboard?       : boolean;
  }): Promise<Database[] | DashboardDatabase[]> {
    return unpackData(
          this._client.apiClient().get("/databases", { params: opts }),
          "apps",
    );
  }

  /**
   * Create a new database
   * @param addon_provider_id ID of the addon provider
   * @param plan_id ID of the plan
   * @param database_name Name of the database
   *
   * @return Promise that when resolved returns the new database.
   */

  create(
    createParams: CreateParams,
  ): Promise<Database[] | DashboardDatabase[]> {
    return unpackData(
      this._client.apiClient().post("/databases", { database: createParams }),
      "apps",
    );
  }
}
