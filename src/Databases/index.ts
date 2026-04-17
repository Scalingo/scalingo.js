import { Client } from "..";
import Maintenances from "./Maintenances";
import {
  Database,
  DashboardDatabase,
  ApiDatabase,
  CreateParams,
  DatabaseType,
  DatabaseTypeVersion,
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
   * Get the URL for downloading the CA Certificate
   * @returns string: the URL to download the CA Certificate from
   */
  caCertificateDownloadURL(): string {
    return this._client.dbaasApiClient().getUri({ url: "/ca_certificate" });
  }
}
