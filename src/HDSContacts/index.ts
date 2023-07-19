import { Client } from "..";
import { HDSContact } from "../models/regional/hds_contact";
import { UpdateParams } from "../params/regional/hds_contacts";
import { unpackData } from "../utils";

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
  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Update HDS Contact
   * @see https://developers.scalingo.com/hds_contacts
   * @param appId
   */
  update(appId: string, params?: UpdateParams): Promise<HDSContact> {
    return unpackData(
      this._client.apiClient().put(`/apps/${appId}/hds_contact`, {
        hds_contact: params,
      }),
      "hds_contact",
    );
  }
}
