import { Client } from "..";
import { Region } from "../models/auth";
import { unpackData } from "../utils";

/**
 * Regions API Client
 */
export default class Regions {
  /** Scalingo API Client */
  _client: Client;

  /**
   * Create a new "thematic" client
   * @param client Scalingo API Client
   */
  constructor(client: Client) {
    this._client = client;
  }

  /**
   * List all known keys
   */
  all(): Promise<Region[]> {
    return unpackData(this._client.authApiClient().get("/regions"), "regions");
  }
}
