export declare type MetricTypes = "cpu" | "memory" | "swap" | "p95_response_time" | "5XX" | "all" | "rpm_per_container";
/** @see https://developers.scalingo.com/metrics */
export interface MetricType {
    /** unique identifier */
    id: MetricTypes | string;
    /** human readable string explaining this metric */
    label: string;
    /** symbol used as a suffix after this metric value */
    suffix: string;
    /** type of metric. Can be either global or router */
    type: string;
}
export interface Point {
    /** Time of the current point */
    time: string;
    /** value of the current point */
    value: number;
}
//# sourceMappingURL=metrics.d.ts.map