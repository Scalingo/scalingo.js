import {
  CreateParams,
  UpdateParams,
} from "src/params/regional/data_access_consent";

import { Client } from "..";
import { DataAccessConsent as DataAccessConsentModel } from "../models/regional";
import { unpackData } from "../utils";

/**
 * Data Access Consent API Client
 */
export default class DataAccessConsent {
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
   * Create a DataAccessConsent
   * @see https://developers.scalingo.com/data_access_consent#create-a-new-dataaccessconsent
   * @param appId ID of the app we're interested in
   */
  create(appId: string, params: CreateParams): Promise<DataAccessConsentModel> {
    return unpackData(
      this._client.apiClient().post(`/apps/${appId}/data_access_consent`, {
        data_access_consent: params,
      }),
      "data_access_consent",
    );
  }

  /**
   * Update a DataAccessConsent
   * @see https://developers.scalingo.com/data_access_consent#create-a-new-dataaccessconsent
   * @param appId ID of the app we're interested in
   */
  update(appId: string, params: UpdateParams): Promise<DataAccessConsentModel> {
    return unpackData(
      this._client.apiClient().patch(`/apps/${appId}/data_access_consent`, {
        data_access_consent: params,
      }),
      "data_access_consent",
    );
  }

  /**
   * Delete a DataAccessConsent
   * @preview
   * @see https://developers.scalingo.com/data_access_consent#create-a-new-dataaccessconsent
   * @param appId ID of the app we're interested in
   */
  destroy(appId: string): Promise<void> {
    return unpackData(
      this._client.apiClient().delete(`/apps/${appId}/data_access_consent`),
    );
  }
}
