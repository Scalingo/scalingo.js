export interface CreateParams {
  /** Notification platform used by this notifer */
  platform_id: string;
  /** Name of the notifier */
  name: string;
  /**  Optional: Is the notifier active or not */
  active?: boolean;
  /**  Optional: Should the notifier accepts all alerts */
  send_all_alerts?: boolean;
  /**  Optional: Should the notifier accepts all events */
  send_all_events?: boolean;
  /**  Optional: List of events accepted by this notifier */
  selected_event_ids?: string[];
  /**  Optional: Notitication platform dependant additional data */
  type_data?: Record<string, any>;
}

export interface UpdateParams {
  /** Name of the notifier */
  name: string;
  /**  Optional: Is the notifier active or not */
  active?: boolean;
  /**  Optional: Should the notifier accepts all alerts */
  send_all_alerts?: boolean;
  /**  Optional: Should the notifier accepts all events */
  send_all_events?: boolean;
  /**  Optional: List of events accepted by this notifier */
  selected_event_ids?: string[];
  /**  Optional: Notitication platform dependant additional data */
  type_data?: Record<string, any>;
}
