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
    );
  }

  /**
   * Create a new database
   * @param createParams Database creation options. Supports both the legacy
   * (`addon_provider_id`/`plan_id`) and new (`technology`/`plan`) keys.
   *
   * @return Promise that when resolved returns the new database.
   */

  create(
    createParams: CreateParams,
  ): Promise<Database[] | DashboardDatabase[]> {
    const {
      addon_provider_id,
      plan_id,
      technology,
      plan,
      ...rest
    } = createParams;

    const databasePayload = {
      ...rest,
      ...(technology ?? addon_provider_id
        ? { technology: technology ?? addon_provider_id }
        : {}),
      ...(plan ?? plan_id ? { plan: plan ?? plan_id } : {}),
    };

    return unpackData(
      this._client
        .apiClient()
        .post("/databases", { database: databasePayload }),
      "apps",
    );
  }
}
