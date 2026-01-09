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

  all(opts?: {
    dashboard?: boolean;
  }): Promise<Database[] | DashboardDatabase[]> {
    return unpackData(
      this._client.apiClient().get("/databases", { params: opts }),
      "databases",
    );
  }

  /**
   * Get details for a specific database
   * @param id ID of the database
   * @return Promise that when resolved returns the requested database.
   */
  show(id: string): Promise<DashboardDatabase> {
    return unpackData(this._client.apiClient().get(`/databases/${id}`));
  }

  /**
   * Create a new database
   * @param technology ID or slug of the technology (addon provider)
   * @param plan ID or name of the plan
   * @param name Name of the database
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
