import { Client } from "..";
import { DataAccessConsent } from "../models/regional/data_access_consents";
import { unpackData } from "../utils";

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
  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Get all existing data_access_consents
   * @see https://developers.scalingo.com/data_access_consents#list-dataaccessconsents-of-an-app
   * @param appId ID of the app to get data_access_consents list
   */
  all(appId: string): Promise<DataAccessConsent[]> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/data_access_consents`),
      "data_access_consents"
    );
  }

  /**
   * Create an agreement for the given data_access_consent
   * @see https://developers.scalingo.com/data_access_consents#create-a-new-dataaccessconsent
   * @param appId ID of the app to get data_access_consents list
   */
  createDataAccessConsent(
    appId: string,
    endAt: string,
    databases: boolean,
    containers: boolean
  ): Promise<DataAccessConsent> {
    return unpackData(
      this._client.apiClient().post(`/apps/${appId}/data_access_consents`, {
        data_access_consent: {
          end_at: endAt,
          databases: databases,
          containers: containers,
        },
      }),
      "data_access_consent"
    );
  }
}
