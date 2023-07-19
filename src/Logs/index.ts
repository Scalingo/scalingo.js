import { Client } from "..";
import LogsListener from "../Logs/listener";
import { ArchivesResult } from "../models/regional/logs";
import { IndexParams } from "../params/regional/logs";
import { unpackData } from "../utils";

export default class Logs {
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
   * Get application logs
   * @see https://developers.scalingo.com/logs
   * @param id ID of the application
   * @param opts Optional additional information
   * @return Promise that when resolved returns the application logs
   */
  async for(id: string, opts: IndexParams): Promise<string> {
    let url = await this._client.Apps.logsURL(id);
    url = `${url}&stream=false`;

    if (opts && opts["count"]) {
      url = `${url}&n=${opts["count"]}`;
    }

    return unpackData(this._client.unauthenticatedClient().get(url));
  }

  /**
   * Open a listener on this app logs
   * @see https://developers.scalingo.com/logs
   * @param {String} id ID of the application
   * @return {Promise<LogsListener>} Promise that when resolved returns a logs listener for this application.
   */
  async listenerFor(id: string): Promise<LogsListener> {
    let url = await this._client.Apps.logsURL(id);
    url = `${url}&stream=true`;

    return new LogsListener(this._client, url);
  }

  /**
   * Get logs archives for an app
   * @see https://developers.scalingo.com/apps#access-to-the-application-logs-archives
   * @param id ID of the application
   * @return Promise that when resolved returns a list of logs archives for this application
   */
  archives(id: string, cursor?: string | number): Promise<ArchivesResult> {
    const params: Record<string, unknown> = {};

    if (cursor !== null && cursor !== undefined) params.cursor = cursor;

    return unpackData(
      this._client.apiClient().get(`/apps/${id}/logs_archives`, { params }),
    );
  }
}
