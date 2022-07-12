import { unpackData } from "../utils";
/**
 * HDS Contact API Client
 */
export default class HDSContacts {
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client) {
        this._client = client;
    }
    /**
     * Update HDS Contact
     * @see https://developers.scalingo.com/hds_contacts
     * @param appId
     */
    update(appId, params) {
        return unpackData(this._client.apiClient().put(`/apps/${appId}/hds_contact`, {
            hds_contact: params,
        }), "hds_contact");
    }
}
//# sourceMappingURL=index.js.map