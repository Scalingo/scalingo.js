import { unpackData } from "../utils";
import { Client } from "..";

import { User } from "../models/auth/user";
import { UpdateParams } from "../params/auth/user";

export class Users {
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
   * Fetch the current user account informations
   * @return Promise that when resolve return the user account informations
   */
  self(): Promise<User> {
    return unpackData(this._client.authApiClient().get("/users/self"), "user");
  }

  /**
   * Updates the current user account informations
   * @param attributes User attributes to update
   * @return Promise that when resolve return the user account informations
   */
  updateAccount(attributes: UpdateParams): Promise<User> {
    return unpackData(
      this._client.authApiClient().put("/users/account", { user: attributes }),
      "user"
    );
  }

  /**
   * Request the account's deletion. Requires a subsequent validation done via email.
   */
  requestAccountDeletion(): Promise<User> {
    return unpackData(this._client.authApiClient().post("/users/delete"));
  }
}

export default Users;
