import { Client } from "..";
import { Autoscaler } from "../models/regional/autoscalers";
import { CreateParams, UpdateParams } from "../params/regional/autoscalers";
import { unpackData } from "../utils";

/**
 * Autoscalers API Client
 */
export default class Autoscalers {
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
   * List all the autoscalers of an application
   * @see https://developers.scalingo.com/autoscalers#list-autoscalers-of-an-app
   * @param appId ID of the app to get autoscalers list
   */
  for(appId: string): Promise<Autoscaler[]> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/autoscalers`),
      "autoscalers",
    );
  }

  /**
   * Create an autoscaler the the application
   * @see https://developers.scalingo.com/autoscalers#create-a-new-autoscaler
   * @param appId ID of the app
   * @param autoscaler The configuration of the autoscaler
   */
  create(appId: string, autoscaler: CreateParams): Promise<Autoscaler> {
    return unpackData(
      this._client
        .apiClient()
        .post(`/apps/${appId}/autoscalers`, { autoscaler: autoscaler }),
      "autoscaler",
    );
  }

  /**
   * Delete a autoscaler from a specific application
   * @see https://developers.scalingo.com/autoscalers#delete-an-autoscaler
   * @param appId ID of the app to post to the specified application
   * @param autoscalerId ID of the specified autoscaler
   */
  destroy(appId: string, autoscalerId: string): Promise<void> {
    return unpackData(
      this._client
        .apiClient()
        .delete(`/apps/${appId}/autoscalers/${autoscalerId}`),
    );
  }

  /**
   * Show a specific autoscaler from an application
   * @see https://developers.scalingo.com/autoscalers#get-an-autoscaler
   * @param appId ID of the app to post to the specified application
   * @param autoscalerId ID of the autoscaler
   */
  show(appId: string, autoscalerId: string): Promise<Autoscaler> {
    return unpackData(
      this._client
        .apiClient()
        .get(`/apps/${appId}/autoscalers/${autoscalerId}`),
      "autoscaler",
    );
  }

  /**
   * Update an autoscaler from a specific application
   * @see https://developers.scalingo.com/autoscalers#update-an-autoscaler
   * @param appId ID of the app
   * @param autoscalerId ID of the autoscaler to update
   * @param autoscaler An object of the autoscaler to update
   */
  update(
    appId: string,
    autoscalerId: string,
    autoscaler: UpdateParams,
  ): Promise<Autoscaler> {
    return unpackData(
      this._client
        .apiClient()
        .patch(`/apps/${appId}/autoscalers/${autoscalerId}`, {
          autoscaler: autoscaler,
        }),
      "autoscaler",
    );
  }
}
