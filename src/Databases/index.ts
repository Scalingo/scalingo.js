import { Client } from "..";
import Backups from "./Backups";
import Maintenances from "./Maintenances";
import {
  Database,
  DashboardDatabase,
  ApiDatabase,
  CreateParams,
  DatabaseUpdateParams,
  DatabasePlan,
  DatabaseMetrics,
  DatabaseInstanceStatus,
  DatabasePitrRestoreResponse,
  LogsArchivesResult,
  DatabaseType,
  DatabaseTypeVersion,
  DbOperation,
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
   * Get detailed information for a specific database from the dbaas API
   * @param addonId ID of the database addon (e.g., 'ad-xxxx-xxxx-xxxx')
   * @return Promise that when resolved returns detailed database information.
   */
  apiShow(addonId: string): Promise<ApiDatabase> {
    return unpackData(
      this._client.dbaasApiClient().get(`/databases/${addonId}`),
      "database",
    );
  }

  /**
   * Update a database configuration via the dbaas API
   * @param addonId ID of the database addon (e.g., 'ad-xxxx-xxxx-xxxx')
   * @param params Database update parameters
   * @return Promise that when resolved returns the updated database.
   */
  apiUpdate(
    addonId: string,
    params: DatabaseUpdateParams,
  ): Promise<ApiDatabase> {
    return unpackData(
      this._client
        .dbaasApiClient()
        .patch(`/databases/${addonId}`, { database: params }),
      "database",
    );
  }

  /**
   * Get the plan information for a specific database from the dbaas API
   * @param addonId ID of the database addon
   * @return Promise that when resolved returns the database plan.
   */
  apiPlan(addonId: string): Promise<DatabasePlan> {
    return unpackData(
      this._client.dbaasApiClient().get(`/databases/${addonId}/plan`),
      "plan",
    );
  }

  /**
   * Get current metrics for a specific database from the dbaas API
   * @param addonId ID of the database addon
   * @return Promise that when resolved returns database metrics.
   */
  apiMetrics(addonId: string): Promise<DatabaseMetrics> {
    return unpackData(
      this._client.dbaasApiClient().get(`/databases/${addonId}/metrics`),
    );
  }

  /**
   * Get time-series metrics for a specific database from the dbaas API
   * @param addonId ID of the database addon
   * @param type Metric type (e.g., 'cpu', 'memory', 'swap', 'disk', 'diskio')
   * @param opts Optional parameters
   * @param opts.since Number of hours to look back (default: 3)
   * @param opts.last Whether to return only the last value
   * @return Promise that when resolved returns the metric data points.
   */
  apiMetricsType(
    addonId: string,
    type: string,
    opts?: { since?: number; last?: boolean },
  ): Promise<unknown> {
    return unpackData(
      this._client
        .dbaasApiClient()
        .get(`/databases/${addonId}/metrics/${type}`, { params: opts }),
    );
  }

  /**
   * Get time-series metrics for a specific database instance from the dbaas API
   * @param addonId ID of the database addon
   * @param instanceId ID of the database instance
   * @param type Metric type (e.g., 'cpu', 'memory', 'swap', 'disk', 'diskio')
   * @param opts Optional parameters
   * @param opts.since Number of hours to look back (default: 3)
   * @param opts.last Whether to return only the last value
   * @return Promise that when resolved returns the metric data points.
   */
  apiInstanceMetrics(
    addonId: string,
    instanceId: string,
    type: string,
    opts?: { since?: number; last?: boolean },
  ): Promise<unknown> {
    return unpackData(
      this._client
        .dbaasApiClient()
        .get(`/databases/${addonId}/instances/${instanceId}/metrics/${type}`, {
          params: opts,
        }),
    );
  }

  /**
   * Get health status for a specific database from the dbaas API
   * @param addonId ID of the database addon
   * @return Promise that when resolved returns database health information.
   */
  apiHealth(addonId: string): Promise<Record<string, unknown>> {
    return unpackData(
      this._client.dbaasApiClient().get(`/databases/${addonId}/health`),
    );
  }

  /**
   * Get instances status for a specific database from the dbaas API
   * @param addonId ID of the database addon
   * @return Promise that when resolved returns instances status.
   */
  apiInstancesStatus(addonId: string): Promise<DatabaseInstanceStatus[]> {
    return unpackData(
      this._client
        .dbaasApiClient()
        .get(`/databases/${addonId}/instances_status`),
    );
  }

  /**
   * Get replication lag for a specific database from the dbaas API
   * @param addonId ID of the database addon
   * @return Promise that when resolved returns lag information.
   */
  apiLag(addonId: string): Promise<Record<string, unknown>> {
    return unpackData(
      this._client.dbaasApiClient().get(`/databases/${addonId}/lag`),
    );
  }

  /**
   * Get a signed URL for accessing database logs from the dbaas API
   * @param addonId ID of the database addon
   * @return Promise that when resolved returns an object with the signed URL.
   */
  apiLogs(addonId: string): Promise<string> {
    return unpackData(
      this._client.dbaasApiClient().get(`/databases/${addonId}/logs`),
      "url",
    );
  }

  /**
   * Get logs archives for a specific database from the dbaas API
   * @param addonId ID of the database addon
   * @param opts Optional parameters
   * @param opts.cursor Pagination cursor
   * @return Promise that when resolved returns logs archives.
   */
  apiLogsArchives(
    addonId: string,
    opts?: { cursor?: number | string },
  ): Promise<LogsArchivesResult> {
    return unpackData(
      this._client
        .dbaasApiClient()
        .get(`/databases/${addonId}/logs_archives`, { params: opts }),
    );
  }

  /**
   * Get all database types from the dbaas API
   * @return Promise that when resolved returns an array of database types.
   */
  listDatabaseTypes(): Promise<DatabaseType[]> {
    return unpackData(
      this._client.dbaasApiClient().get("/database_types"),
      "database_types",
    );
  }

  /**
   * Get information for a specific database type from the dbaas API
   * @param id ID of the database type
   * @return Promise that when resolved returns database type information.
   */
  showDatabaseType(id: string): Promise<DatabaseType> {
    return unpackData(
      this._client.dbaasApiClient().get(`/database_types/${id}`),
      "database_type",
    );
  }

  /**
   * Get information for a specific database type version from the dbaas API
   * @param id ID of the database type version
   * @return Promise that when resolved returns database type version information.
   */
  showDatabaseTypeVersion(id: string): Promise<DatabaseTypeVersion> {
    return unpackData(
      this._client.dbaasApiClient().get(`/database_type_versions/${id}`),
      "database_type_version",
    );
  }

  /**
   * Ping a database via the dbaas API
   * @param addonId ID of the database addon
   * @return Promise that resolves when the ping succeeds.
   */
  apiPing(addonId: string): Promise<Record<string, unknown>> {
    return unpackData(
      this._client.dbaasApiClient().post(`/databases/${addonId}/ping`, {}),
    );
  }

  /**
   * Upgrade a database to the next version via the dbaas API
   * @param addonId ID of the database addon
   * @return Promise that when resolved returns upgrade information including operation_id.
   */
  apiUpgrade(addonId: string): Promise<Record<string, unknown>> {
    return unpackData(
      this._client.dbaasApiClient().post(`/databases/${addonId}/upgrade`, {}),
    );
  }

  /**
   * Get the status of a database operation via the dbaas API
   * @param addonId ID of the database addon (e.g., 'ad-xxxx-xxxx-xxxx')
   * @param operationId ID of the operation
   * @return Promise that when resolved returns the operation details.
   */
  apiOperationShow(addonId: string, operationId: string): Promise<DbOperation> {
    return unpackData(
      this._client
        .dbaasApiClient()
        .get(`/databases/${addonId}/operations/${operationId}`),
      "operation",
    );
  }

  /**
   * Restore a database to a point in time via the dbaas API
   * @param addonId ID of the database addon
   * @param restoreTime Point-in-time restore target
   * @return Promise that when resolved returns the restore operation payload.
   */
  apiPitrRestore(
    addonId: string,
    restoreTime: string,
  ): Promise<DatabasePitrRestoreResponse> {
    return unpackData(
      this._client.dbaasApiClient().post(`/databases/${addonId}/pitr/restore`, {
        restore_time: restoreTime,
      }),
    );
  }

  /**
   * Run a database action via the dbaas API
   * @param addonId ID of the database addon
   * @param actionName Name of the action to perform
   * @param actionParams Optional parameters for the action
   * @return Promise that when resolved returns the action result.
   */
  apiAction(
    addonId: string,
    actionName: string,
    actionParams?: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    return unpackData(
      this._client.dbaasApiClient().post(`/databases/${addonId}/action`, {
        action_name: actionName,
        params: actionParams || {},
      }),
    );
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

  /**
   * Get the maintenances client for a database
   * @param databaseId ID of the database addon (e.g., 'ad-xxxx-xxxx-xxxx')
   * @return Maintenances client for the database
   */
  maintenances(databaseId: string): Maintenances {
    return new Maintenances(this._client, databaseId);
  }

  /**
   * Get the backups client for a database
   * @param databaseId ID of the database addon (e.g., 'ad-xxxx-xxxx-xxxx')
   * @return Backups client for the database
   */
  backups(databaseId: string): Backups {
    return new Backups(this._client, databaseId);
  }

  /**
   * Get the URL for downloading the CA Certificate
   * @returns string: the URL to download the CA Certificate from
   */
  caCertificateDownloadURL(): string {
    return this._client.dbaasApiClient().getUri({ url: "/ca_certificate" });
  }
}
