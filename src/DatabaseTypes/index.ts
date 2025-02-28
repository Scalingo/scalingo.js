import { Client } from "..";
import {
  DatabaseType,
  DatabaseTypeVersion,
} from "../models/regional/database_types";
import { unpackData } from "../utils";

export interface IndexResponse {
  database_types: DatabaseType[];
}

export interface VersionsResponse {
  database_type_versions: DatabaseTypeVersion[];
}

/**
 * Database API Client
 */
export default class DatabaseTypes {
  /** Scalingo API Client */
  _client: Client;

  /**
   * Create a new database API client
   * @param client Scalingo API Client
   */
  constructor(client: Client) {
    this._client = client;
  }

  /**
   * List all database types
   */
  listDatabaseTypes(): Promise<DatabaseType[]> {
    return unpackData(
      this._client.apiClient().get(`/v1/database_types`),
      "database_types",
    );
  }

  /**
   * Get details of a specific database type
   * @param databaseTypeId ID of the database type
   */
  getDatabaseType(databaseTypeId: string): Promise<DatabaseType> {
    return unpackData(
      this._client.apiClient().get(`/v1/database_types/${databaseTypeId}`),
      "database_type",
    );
  }

  /**
   * List all versions of a specific database type
   * @param databaseTypeId ID of the database type
   */
  listDatabaseTypeVersions(
    databaseTypeId: string,
  ): Promise<DatabaseTypeVersion[]> {
    return unpackData(
      this._client
        .apiClient()
        .get(`/v1/database_types/${databaseTypeId}/versions`),
      "database_type_versions",
    );
  }

  /**
   * Get details of a specific database type version
   * @param versionId ID of the database type version
   */
  getDatabaseTypeVersion(versionId: string): Promise<DatabaseTypeVersion> {
    return unpackData(
      this._client.apiClient().get(`/v1/database_type_versions/${versionId}`),
      "database_type_version",
    );
  }
}
