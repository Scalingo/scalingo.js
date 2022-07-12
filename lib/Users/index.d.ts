import { Client } from "..";
import { User } from "../models/auth/user";
import { DeletionParams, UpdateParams } from "../params/auth/user";
export declare class Users {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * Fetch the current user account informations
     * @return Promise that when resolve return the user account informations
     */
    self(): Promise<User>;
    /**
     * Updates the current user account informations
     * @param attributes User attributes to update
     * @return Promise that when resolve return the user account informations
     */
    updateAccount(attributes: UpdateParams): Promise<User>;
    /**
     * Request to stop the free trial of the current user account.
     */
    stopFreeTrial(): Promise<void>;
    /**
     * Request the account's deletion. Requires a subsequent validation done via email.
     */
    requestAccountDeletion(): Promise<void>;
    /**
     * Confirm the account's deletion.
     */
    confirmAccountDeletion(deletionId: string, params: DeletionParams): Promise<void>;
}
export default Users;
//# sourceMappingURL=index.d.ts.map