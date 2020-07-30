import { unpackData } from '../utils'
import { Client } from '..'

/** @see https://developers.scalingo.com/metrics */
export interface MetricType {
  /** unique identifier */
  id: string
  /** human readable string explaining this metric */
  label: string
  /** symbol used as a suffix after this metric value */
  suffix: string
  /** type of metric. Can be either global or router */
  type: string
}

export interface Point {
  /** Time of the current point */
  time: string
  /** value of the current point */
  value: number
}

export interface MetricsQuery {
  /** Number of hours requested (max 71) */
  since?: number
  /** Only available when requesting router metrics. One of the following: [all, 1XX, 2XX, 3XX, 4XX, 5XX] */
  statusCode?: string
  /** Only available when requesting requests metrics. One of the following: [media, p95, p99] */
  statisticsType?: string
  /** Container type filter */
  containerType?: string
  /** Container index (only available when containerType is set and for non router metrics) */
  containerIndex?: number
  /** only fetch the last metrics */
  last?: boolean
}

/**
 * Metrics API Client
 */
export default class Metrics {
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
   * List all the metrics available on the platform.
   * @see https://developers.scalingo.com/metrics#list-the-metrics-available
   * @return Promise that when resolved return a list of all metrics available on the platform.
   */
  types(): Promise<MetricType[]> {
    return unpackData(
      this._client.apiClient().get('/features/metrics'),
      'metrics',
    )
  }

  /**
   * Fetch metrics for an app
   * @param appId Application ID
   * @param metrics Which metric to get. One of the following: [router, requests, cpu, ram, swap]
   * @param opts Optional params
   * @return {Promise<Point[]>} Promise that when resolve return an array of points for the requested metrics
   */
  get(
    appId: string,
    metric: string,
    opts: MetricsQuery = {},
  ): Promise<Point[]> {
    const {
      since,
      statusCode,
      statisticsType,
      containerIndex,
      containerType,
      last,
    } = opts

    const params: Record<string, any> = {}

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
