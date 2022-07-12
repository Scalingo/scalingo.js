import { Client } from "..";
import { MetricType, Point } from "../models/regional/metrics";
import { QueryParams } from "../params/regional/metrics";
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
    constructor(client: Client);
    /**
     * List all the metrics available on the platform.
     * @see https://developers.scalingo.com/metrics#list-the-metrics-available
     * @return Promise that when resolved return a list of all metrics available on the platform.
     */
    types(): Promise<MetricType[]>;
    /**
     * Fetch metrics for an app
     * @param appId Application ID
     * @param metrics Which metric to get. One of the following: [router, requests, cpu, ram, swap]
     * @param opts Optional params
     * @return {Promise<Point[]>} Promise that when resolve return an array of points for the requested metrics
     */
    get(appId: string, metric: string, opts?: QueryParams): Promise<Point[]>;
}
//# sourceMappingURL=index.d.ts.map