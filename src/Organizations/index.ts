import { Client } from "..";
import { Organization } from "../models/auth/organizations";
import { CreateParams } from "../params/auth/organizations";
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

  /**
   * Create a new organization
   * @param payload Organization creation parameters
   * @return Promise that when resolved returns the created organization.
   */
  create(payload: CreateParams): Promise<Organization> {
    return unpackData(
      this._client
        .authApiClient()
        .post("/organizations", { organization: payload }),
      "organization",
    );
  }
}
