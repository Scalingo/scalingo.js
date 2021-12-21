import { Client } from "..";
import { Notifier } from "../models/regional/notifiers";
import { CreateParams, UpdateParams } from "../params/regional/notifiers";
import { unpackData } from "../utils";

/**
 * Notifiers API Client
 */
export default class Notifiers {
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
   * Get list of notifiers of an application
   * @see https://developers.scalingo.com/notifiers#list-application-notifiers
   * @param appId ID of the app to get the notifiers from
   */
  for(appId: string): Promise<Notifier[]> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/notifiers`),
      "notifiers"
    );
  }

  /**
   * Add a notifier to an application
   * @see https://developers.scalingo.com/notifiers#add-a-notifier
   * @param appId ID of the app
   * @param notifier New notifier configuration
   */
  create(appId: string, notifier: CreateParams): Promise<Notifier> {
    return unpackData(
      this._client.apiClient().post(`/apps/${appId}/notifiers`, {
        notifier: notifier,
      }),
      "notifier"
    );
  }

  /**
   * Upgrade a notifier
   * @see https://developers.scalingo.com/notifiers#update-a-notifier
   * @param appId ID of the current application
   * @param notifierId ID of the current notifier
   * @param notifier Updated notifier configuration
   */
  update(
    appId: string,
    notifierId: string,
    notifier: UpdateParams
  ): Promise<Notifier> {
    return unpackData(
      this._client.apiClient().patch(`/apps/${appId}/notifiers/${notifierId}`, {
        notifier: notifier,
      }),
      "notifier"
    );
  }

  /**
   * Remove a notifier
   * @see https://developers.scalingo.com/notifiers#remove-a-notifier
   * @param appId ID of the current application
   * @param notifierId ID of the notifier
   */
  destroy(appId: string, notifierId: string): Promise<void> {
    return unpackData(
      this._client.apiClient().delete(`/apps/${appId}/notifiers/${notifierId}`)
    );
  }

  /**
   * Send a test notification to the notifier
   * @see https://developers.scalingo.com/notifiers#test-a-notifier
   * @param appId The ID of the current application
   * @param notifierId The ID of the notifier
   */
  test(appId: string, notifierId: string): Promise<void> {
    return unpackData(
      this._client
        .apiClient()
        .post(`/apps/${appId}/notifiers/${notifierId}/test`)
    );
  }

  /**
   * Get a specific notifier
   * @param {String} appId The ID of the current application
   * @param {String} notifierId The ID of the notifier to get
   */
  get(appId: string, notifierId: string): Promise<Notifier> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/notifiers/${notifierId}`),
      "notifier"
    );
  }
}
