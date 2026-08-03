import { Client } from "..";
import { Organization } from "../models/auth/organizations";
import { unpackData } from "../utils";

/**
 * Organizations API Client
 */
export default class Organizations {
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
   * List all organizations the current user is a member of
   * @return A list of organizations
   */
  all(): Promise<Organization[]> {
    return unpackData(
      this._client.authApiClient().get("/organizations"),
      "organizations",
    );
  }
}
