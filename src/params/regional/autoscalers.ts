import { MetricTypes } from "../../models/regional/metrics";

/** @see https://developers.scalingo.com/autoscalers#create-a-new-autoscaler */
export interface CreateParams {
  /** Container type affected by the autoscaling */
  container_type: string;
  /** Lower limit of containers */
  min_containers: number;
  /** Upper limit of containers */
  max_containers: number;
  /** Metric name this autoscaler is about */
  metric: MetricTypes | string;
  /** Metric value the autoscaler aims to reach */
  target: number;
}

/** @see https://developers.scalingo.com/autoscalers#update-an-autoscaler */
export interface UpdateParams {
  /** Lower limit of containers */
  min_containers?: number;
  /** Upper limit of containers */
  max_containers?: number;
  /** Metric name this autoscaler is about */
  metric?: MetricTypes | string;
  /** Metric value the autoscaler aims to reach */
  target?: number;
  /** Is the autoscaler disabled */
  disabled?: boolean;
}
