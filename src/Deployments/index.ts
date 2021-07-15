import { unpackData } from "../utils";
import { Client } from "..";
import { PaginationOpts } from "../meta";
import { DeploymentsResult, Deployment } from "../models/regional/deployments";
import { CreateParams } from "src/params/regional/deployments";

/**
 * Deployment API Client
 */

export default class Deployments {
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
   * List all deployments for an app
   * @see https://developers.scalingo.com/deployments#list-the-deployments-of-an-app
   * @param appId ID of the app
   * @param opts optional parameters
   * @return List of deployments for this app
   */
  for(appId: string, opts: PaginationOpts): Promise<DeploymentsResult> {
    return unpackData(
      this._client
        .apiClient()
        .get(`/apps/${appId}/deployments`, { params: opts })
    );
  }

  /**
   * Create a deployment from an archive
   * @see https://developers.scalingo.com/deployments#trigger-manually-a-deployment-from-an-archive
   * @param appId ID of the app
   * @param opts optional parameters
   * @return List of deployments for this app
   */
  create(appId: string, deployment: CreateParams): Promise<Deployment> {
    return unpackData(
      this._client
        .apiClient()
        .post(`/apps/${appId}/deployments`, { deployment }),
      "deployment"
    );
  }

  /**
   * Get a deployment of an app
   * @see https://developers.scalingo.com/deployments#get-a-particular-deployment
   * @param appId ID of the app
   * @param deploymentId ID of the deployment
   * @return {Promise<Deployment>} Details of the deployment
   */
  find(appId: string, deploymentId: string): Promise<Deployment> {
    return unpackData(
      this._client
        .apiClient()
        .get(`/apps/${appId}/deployments/${deploymentId}`),
      "deployment"
    );
  }

  /**
   * Get the logs of a deployment
   * @see https://developers.scalingo.com/deployments#get-the-output-of-the-deployment
   * @param appId ID of the app
   * @param deploymentId ID of the deployment
   * @return Logs of the deployment
   */
  logs(appId: string, deploymentId: string): Promise<string> {
    return unpackData(
      this._client
        .apiClient()
        .get(`/apps/${appId}/deployments/${deploymentId}/output`)
    );
  }

  /**
   * Purge the deployment cache
   * @see https://developers.scalingo.com/deployments#manually-reset-the-deployment-cache
   * @param appId ID of the app
   * @return No content
   */
  purgeCache(appId: string): Promise<void> {
    return unpackData(
      this._client.apiClient().delete(`/apps/${appId}/caches/deployment`)
    );
  }
}
