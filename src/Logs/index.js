import LogsListener from '../Logs/listener'
import { unpackData } from '../utils'

export default class Logs {
  /**
   * Create a new Client for the Logs API
   * @param {Client} client - Scalingo API client
   */
  constructor(client) {
    this._client = client
  }

  /**
   * Get application logs
   * @see https://developers.scalingo.com/logs
   * @param {String} id - ID of the application
   * @param {AppLogsOpts} opts - Optional additional information
   * @return {Promise<String, APIError>} Promise that when resolved returns the application logs
   */
  async for(id, opts) {
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
  async listenerFor(id) {
    let url = await this._client.Apps.logsURL(id)
    url = `${url}&stream=true`

    return new LogsListener(this._client, url)
  }

  /**
   * Get logs archives for an app
   * @see https://developers.scalingo.com/apps#access-to-the-application-logs-archives
   * @param {String} id ID of the application
   * @return {Promise<Archive[], APIError>} Promise that when resolved returns a list of logs archives for this application
   */
  archives(id) {
    // Pagination is not supported in the lib. We're waiting correct pagination metadata.
    // See: https://github.com/Scalingo/api/issues/1438
    return unpackData(
      this._client.apiClient().get(`/apps/${id}/logs_archives`),
      'archives',
    )
  }
}

/**
 * @typedef {Object} AppLogsOpts
 * @property {Number} count Number of log lines to fetch
 */

/**
 * @typedef {Object} Archive
 * @see https://developers.scalingo.com/apps#access-to-the-application-logs-archives
 * @property {String} url Pre-signed URL to download logs archives
 * @property {Number} size Size of the logs archive
 * @property {Date} from Date of the first log line present in the archive
 * @property {Date} to Date of the last log line present in the archive
 */
