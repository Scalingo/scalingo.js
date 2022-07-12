import { unpackData } from "../utils";
export class Users {
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client) {
        this._client = client;
    }
    /**
     * Fetch the current user account informations
     * @return Promise that when resolve return the user account informations
     */
    self() {
        return unpackData(this._client.authApiClient().get("/users/self"), "user");
    }
    /**
     * Updates the current user account informations
     * @param attributes User attributes to update
     * @return Promise that when resolve return the user account informations
     */
    updateAccount(attributes) {
        return unpackData(this._client.authApiClient().put("/users/account", { user: attributes }), "user");
    }
    /**
     * Request to stop the free trial of the current user account.
     */
    stopFreeTrial() {
        return unpackData(this._client.authApiClient().post("/users/stop_free_trial"));
    }
    /**
     * Request the account's deletion. Requires a subsequent validation done via email.
     */
    requestAccountDeletion() {
        return unpackData(this._client.authApiClient().post("/users/delete"));
    }
    /**
     * Confirm the account's deletion.
     */
    confirmAccountDeletion(deletionId, params) {
        return unpackData(this._client
            .authApiClient()
            .post(`/users/delete/${deletionId}/confirm`, { deletion: params }));
    }
}
export default Users;
//# sourceMappingURL=index.js.map