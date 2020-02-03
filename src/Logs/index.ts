import LogsListener from '../Logs/listener'
import { unpackData } from '../utils'
import { Client, APIResponse } from '..'
import { APIError } from '@/errors'

export interface AppLogsOpts {
  /** Number of log lines to fetch */
  count: number
}

/** @see https://developers.scalingo.com/apps#access-to-the-application-logs-archives */
export interface Archive {
  /** Pre-signed URL to download logs archives */
  url: string
  /** Size of the logs archive */
  size: number
  /** Date of the first log line present in the archive */
  from: string
  /** Date of the last log line present in the archive */
  to: string
}

export default class Logs {
  /** Scalingo API Client */
  _client: Client

  /**
   * Create a new "thematic" client
   * @param client Scalingo API Client
   */
  constructor(client: Client) {
    this._client = client
  }

  /**
   * Get application logs
   * @see https://developers.scalingo.com/logs
   * @param id ID of the application
   * @param opts Optional additional information
   * @return Promise that when resolved returns the application logs
   */
  async for(id: string, opts: AppLogsOpts): Promise<string | APIError> {
    let url = await this._client.Apps.logsURL(id)
    url = `${url}&stream=false`

    if (opts && opts['count']) {
      url = `${url}&n=${opts['count']}`
    }

    return unpackData(this._client.unauthenticatedClient().get(url))
  }

  /**
   * Open a listener on this app logs
   * @see https://developers.scalingo.com/logs
   * @param {String} id ID of the application
   * @return {Promise<LogsListener, APIError>} Promise that when resolved returns a logs listener for this application.
   */
  async listenerFor(id: string): Promise<LogsListener | APIError> {
    let url = await this._client.Apps.logsURL(id)
    url = `${url}&stream=true`

    return new LogsListener(this._client, url)
  }

  /**
   * Get logs archives for an app
   * @see https://developers.scalingo.com/apps#access-to-the-application-logs-archives
   * @param id ID of the application
   * @return Promise that when resolved returns a list of logs archives for this application
   */
  archives(id: string): APIResponse<Archive[] | APIError> {
    // Pagination is not supported in the lib. We're waiting correct pagination metadata.
    // See: https://github.com/Scalingo/api/issues/1438
    return unpackData(
      this._client.apiClient().get(`/apps/${id}/logs_archives`),
      'archives',
    )
  }
}
