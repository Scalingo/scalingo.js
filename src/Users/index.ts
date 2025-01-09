import { Client } from "..";
import { User } from "../models/auth/user";
import { DeletionParams, UpdateParams } from "../params/auth/user";
import { unpackData } from "../utils";

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
      "user",
    );
  }

  /**
   * Request to stop the free trial of the current user account.
   */
  stopFreeTrial(): Promise<void> {
    return unpackData(
      this._client.authApiClient().post("/users/stop_free_trial"),
    );
  }

  /**
   * Request the account's deletion. Requires a subsequent validation done via email.
   */
  requestAccountDeletion(): Promise<void> {
    return unpackData(this._client.authApiClient().post("/users/delete"));
  }

  /**
   * Confirm the account's deletion.
   */
  confirmAccountDeletion(
    deletionId: string,
    params: DeletionParams,
  ): Promise<void> {
    return unpackData(
      this._client
        .authApiClient()
        .post(`/users/delete/${deletionId}/confirm`, { deletion: params }),
    );
  }

  /**
   * List all known roles.
   */
  roles(): Promise<string[]> {
    return unpackData(
      this._client.authApiClient().get("/users/roles"),
      "roles",
    );
  }
}

export default Users;
