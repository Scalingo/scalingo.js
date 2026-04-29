import { Client } from "../..";
import { Backup } from "../../models/regional/backups";
import { unpackData } from "../../utils";

/**
 * Backups API Client
 */
export default class Backups {
  /** Scalingo API Client */
  _client: Client;
  /** Database ID */
  _databaseId: string;

  /**
   * Create a new "thematic" client
   * @param client Scalingo API Client
   * @param databaseId Database ID
   */
  constructor(client: Client, databaseId: string) {
    this._client = client;
    this._databaseId = databaseId;
  }

  /**
   * List all backups for the database
   * @return Promise that when resolved returns the list of backups.
   */
  all(): Promise<Backup[]> {
    return unpackData(
      this._client
        .dbaasApiClient()
        .get(`/databases/${this._databaseId}/backups`),
      "database_backups",
    );
  }

  /**
   * Create a manual backup for the database
   * @return Promise that when resolved returns the created backup.
   */
  create(): Promise<Backup> {
    return unpackData(
      this._client
        .dbaasApiClient()
        .post(`/databases/${this._databaseId}/backups`, {}),
      "database_backup",
    );
  }
}
