import { Client } from "..";
import { HDSContact } from "../models/regional/hds_contact";
import { UpdateParams } from "../params/regional/hds_contacts";
/**
 * HDS Contact API Client
 */
export default class HDSContacts {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * Update HDS Contact
     * @see https://developers.scalingo.com/hds_contacts
     * @param appId
     */
    update(appId: string, params: UpdateParams): Promise<HDSContact>;
}
//# sourceMappingURL=index.d.ts.map