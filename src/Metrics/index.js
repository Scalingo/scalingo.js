import { unpackData } from '../utils'

/**
 * Metrics API Client
 */
export default class Metrics {
  constructor(client) {
    this._client = client
  }

  /**
   * List all the metrics available on the platform.
   * @see https://developers.scalingo.com/metrics#list-the-metrics-available
   * @return {Promise<MetricType[] | APIError>} Promise that when resolved return a list of all metrics available on the platform.
   */
  types() {
    return unpackData(
      this._client.apiClient().get('/features/metrics'),
      'metrics',
    )
  }

  /**
   * Fetch metrics for an app
   * @param {String} appId Application ID
   * @param {String} metrics Which metric to get. One of the following: [router, requests, cpu, ram, swap]
   * @param {Object} opts Optional params
   * @param {Number} opts.since Number of hours requested (max 71)
   * @param {String} opts.statusCode Only available when requesting router metrics. One of the following: [all, 1XX, 2XX, 3XX, 4XX, 5XX]
   * @param {String} opts.statisticsType Only available when requesting requests metrics. One of the following: [media, p95, p99]
   * @param {String} opts.containerType Container type filter
   * @param {Number} opts.containerIndex Container index (only available when containerType is set and for non router metrics)
   * @param {Boolean} opts.last only fetch the last metrics
   * @return {Promise<Point[] | APIError>} Promise that when resolve return an array of points for the requested metrics
   */
  get(appId, metric, opts = {}) {
    const {
      since,
      statusCode,
      statisticsType,
      containerIndex,
      containerType,
      last,
    } = opts
    const params = {}
    let url = `/apps/${appId}/stats/${metric}`
    if (since !== undefined) {
      params['since'] = since
    }
    if (statusCode !== undefined) {
      params['status_code'] = statusCode
    }
    if (statisticsType !== undefined) {
      params['statistics_type'] = statisticsType
    }
    if (last !== undefined) {
      params['last'] = last
    }

    if (containerType !== undefined) {
      url = `${url}/${containerType}`
      if (containerIndex !== undefined) {
        url = `${url}/${containerIndex}`
      }
    }

    return unpackData(this._client.apiClient().get(url, { params: params }))
  }
}

/**
 * @typedef {Object} MetricType
 * @see https://developers.scalingo.com/metrics
 * @property {String} id unique identifier
 * @property {String} label human readable string explaining this metric
 * @property {String} suffix symbol used as a suffix after this metric value
 * @property {String} type type of metric. Can be either global or router
 */

/**
 * @typedef {Object} Point
 * @property {String} time Time of the current point
 * @property {Number} value value of the current point
 */
