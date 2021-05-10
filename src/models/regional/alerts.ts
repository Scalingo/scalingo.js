/** @see https://developers.scalingo.com/alerts */
export interface Alert {
  id: string;
  app_id: string;
  created_at: string;
  updated_at: string;
  container_type: string;
  disabled: boolean;
  metric: string;
  limit: number;
  send_when_below: boolean;
  duration_before_trigger: number;
  remind_every?: number;
  metadata: Record<string, unknown>;
}

export type AlertWithNotifiers = Alert & {
  notifiers: string[];
};
