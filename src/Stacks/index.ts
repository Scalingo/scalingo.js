import { Client } from "..";
import { Stack } from "../models/regional";
import { unpackData } from "../utils";

/**
 * Stacks API Client
 */
export class Stacks {
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
   * Return a list of stacks
   * @return The stacks available in the platform
   */
  list(): Promise<Stack[]> {
    return unpackData(
      this._client.apiClient().get("/features/stacks"),
      "stacks",
    );
  }
}

export default Stacks;
