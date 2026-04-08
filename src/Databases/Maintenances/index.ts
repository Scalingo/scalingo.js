import { Client } from "../..";
import { PaginationOpts } from "../../meta";
import {
  Maintenance,
  MaintenancesResult,
} from "../../models/regional/maintenances";
import { unpackData } from "../../utils";

/**
 * Maintenances API Client
 */
export default class Maintenances {
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
   * List all maintenances for the database
   * @param opts Optional pagination parameters
   * @return Promise that when resolved returns a paginated list of maintenances.
   */
  all(opts?: PaginationOpts): Promise<MaintenancesResult> {
    return unpackData(
      this._client
        .dbaasApiClient()
        .get(`/databases/${this._databaseId}/maintenance`, { params: opts }),
    );
  }

  /**
   * Get a specific maintenance
   * @param maintenanceId ID of the maintenance
   * @return Promise that when resolved returns maintenance details.
   */
  show(maintenanceId: string): Promise<Maintenance> {
    return unpackData(
      this._client
        .dbaasApiClient()
        .get(`/databases/${this._databaseId}/maintenance/${maintenanceId}`),
    );
  }
}
