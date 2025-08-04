import { Client } from "..";
import { Database } from "../models/regional/databases";
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

  all(opts?: { dashboard?: boolean }): Promise<Database[] | DashboardDatabase[]> {
    return unpackData(
      this._client
        .apiClient()
        .get("/databases", { params: opts }),
      "apps"
    );
  }
}
