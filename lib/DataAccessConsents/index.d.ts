import { Client } from "..";
import { DataAccessConsent } from "../models/regional/data_access_consents";
/**
 * Data Access Consents API Client
 */
export default class DataAccessConsents {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * Get all existing data_access_consents
     * @see https://developers.scalingo.com/data_access_consents#list-dataaccessconsents-of-an-app
     * @param appId ID of the app to get data_access_consents list
     */
    all(appId: string): Promise<DataAccessConsent[]>;
    /**
     * Create an agreement for the given data_access_consent
     * @see https://developers.scalingo.com/data_access_consents#create-a-new-dataaccessconsent
     * @param appId ID of the app to get data_access_consents list
     */
    createDataAccessConsent(appId: string, endAt: string, databases: boolean, containers: boolean): Promise<DataAccessConsent>;
}
//# sourceMappingURL=index.d.ts.map