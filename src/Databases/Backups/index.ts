import { Client } from "../..";
import { Backup, BackupRestoration } from "../../models/regional/backups";
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

  /**
   * Retrieve a specific backup for the database
   * @param backupId Backup ID
   * @return Promise that when resolved returns the backup.
   */
  show(backupId: string): Promise<Backup> {
    return unpackData(
      this._client
        .dbaasApiClient()
        .get(`/databases/${this._databaseId}/backups/${backupId}`),
      "database_backup",
    );
  }

  /**
   * Get a download URL for a specific backup
   * @param backupId Backup ID
   * @return Promise that when resolved returns the download URL.
   */
  archiveUrl(backupId: string): Promise<string> {
    return unpackData(
      this._client
        .dbaasApiClient()
        .get(`/databases/${this._databaseId}/backups/${backupId}/archive`),
      "download_url",
    );
  }

  /**
   * Restore a specific backup
   * @param backupId Backup ID
   * @return Promise that when resolved returns the backup restoration object.
   */
  restore(backupId: string): Promise<BackupRestoration> {
    return unpackData(
      this._client
        .dbaasApiClient()
        .post(`/databases/${this._databaseId}/backups/${backupId}/restore`, {}),
      "backup_restoration",
    );
  }
}
