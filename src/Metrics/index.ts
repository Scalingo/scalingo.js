import { Client } from "..";
import { MetricType, Point } from "../models/regional/metrics";
import { QueryParams } from "../params/regional/metrics";
import { unpackData } from "../utils";

/**
 * Metrics API Client
 */
export default class Metrics {
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
   * List all the metrics available on the platform.
   * @see https://developers.scalingo.com/metrics#list-the-metrics-available
   * @return Promise that when resolved return a list of all metrics available on the platform.
   */
  types(): Promise<MetricType[]> {
    return unpackData(
      this._client.apiClient().get("/features/metrics"),
      "metrics",
    );
  }

  /**
   * Fetch metrics for an app
   * @param appId Application ID
   * @param metrics Which metric to get. One of the following: [router, requests, cpu, ram, swap]
   * @param opts Optional params
   * @return {Promise<Point[]>} Promise that when resolve return an array of points for the requested metrics
   */
  get(appId: string, metric: string, opts: QueryParams = {}): Promise<Point[]> {
    const {
      since,
      statusCode,
      statisticsType,
      containerIndex,
      containerType,
      last,
    } = opts;

    const params: Record<string, string | number | boolean> = {};

    let url = `/apps/${appId}/stats/${metric}`;

    if (since !== undefined) {
      params["since"] = since;
    }

    if (statusCode !== undefined) {
      params["status_code"] = statusCode;
    }

    if (statisticsType !== undefined) {
      params["statistics_type"] = statisticsType;
    }

    if (last !== undefined) {
      params["last"] = last;
    }

    if (containerType !== undefined) {
      url = `${url}/${containerType}`;

      if (containerIndex !== undefined) {
        url = `${url}/${containerIndex}`;
      }
    }

    return unpackData(this._client.apiClient().get(url, { params: params }));
  }
}
