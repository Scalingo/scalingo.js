import { MetricTypes } from "./metrics";

export interface Autoscaler {
  /** Unique ID, starts with "au-" */
  id: string;
  /** Creation date of the autoscaler */
  created_at: string;
  /** Last time the autoscaler has been updated */
  updated_at: string;
  /** Date of the last scale operation */
  last_scale: string;
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
  /** Is the autoscaler disabled */
  disabled: boolean;
  /** Alert triggered when needed to scale up */
  alert_id_scale_up: string;
  /** Alert triggered when needed to scale down */
  alert_id_scale_down: string;
}
