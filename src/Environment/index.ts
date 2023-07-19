import { Client } from "..";
import { Variable } from "../models/regional/environment";
import {
  CreateParams,
  UpdateParams,
  BulkUpdateParams,
} from "../params/regional/environment";
import { unpackData } from "../utils";

/**
 * Environment API Client
 */
export default class Environment {
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
   * List all the environment variables of an application
   * @see https://developers.scalingo.com/environment#list-environment-variables-of-an-app
   * @param appId ID of the app to get domains list
   */
  for(appId: string): Promise<Variable[]> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/variables`),
      "variables",
    );
  }

  /**
   * Create an environment variable for an application
   * @see https://developers.scalingo.com/environment#add-environment-variables-to-an-app
   * @param appId ID of the app to get domains list
   * @param variable An Object that contain the information about the environment variable
   */
  create(appId: string, variable: CreateParams): Promise<Variable> {
    return unpackData(
      this._client
        .apiClient()
        .post(`/apps/${appId}/variables`, { variable: variable }),
      "variable",
    );
  }

  /**
   * Create or update multiple environment variables for an application
   * @see https://developers.scalingo.com/environment#bulk-update-of-the-environment-of-an-app
   * @param appId ID of the app to get domains list
   * @param variablesArray An array of Object that contain the information about the environment variables to update
   */
  bulkUpdate(
    appId: string,
    variablesArray: BulkUpdateParams,
  ): Promise<Variable[]> {
    return unpackData(
      this._client
        .apiClient()
        .put(`/apps/${appId}/variables`, { variables: variablesArray }),
      "variables",
    );
  }

  /**
   * Update an environment variable
   * @see https://developers.scalingo.com/environment#update-an-environment-variable
   * @param appId ID of the app to get domains list
   * @param id ID of the variable to update
   * @param value An string of the value of the environment variable to update
   */
  update(appId: string, id: string, value: UpdateParams): Promise<Variable> {
    return unpackData(
      this._client.apiClient().patch(`/apps/${appId}/variables/${id}`, {
        variable: { value },
      }),
      "variable",
    );
  }

  /**
   * Delete an environment variable
   * @see https://developers.scalingo.com/environment#delete-an-environment-variable
   * @param appId ID of the app to get domains list
   * @param variableId ID of the variable to delete
   */
  destroy(appId: string, variableId: string): Promise<void> {
    return unpackData(
      this._client.apiClient().delete(`/apps/${appId}/variables/${variableId}`),
    );
  }

  /**
   * Delete multiple environment variables
   * @see https://developers.scalingo.com/environment#bulk-delete-environment-variables-of-an-app
   * @param appId ID of the app
   * @param variablesArray An array of variables id
   */
  bulkDestroy(appId: string, variablesArray: string[]): Promise<string[]> {
    return unpackData(
      this._client.apiClient().delete(`/apps/${appId}/variables`, {
        data: { variable_ids: variablesArray },
      }),
      "variable_ids",
    );
  }
}
