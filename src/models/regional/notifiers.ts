export interface Notifier {
  /** Unique ID identifying the notifier */
  id: string
  /** Unique ID referencing the app this notifier belongs to */
  app_id: string
  /** Creation date of the notifier */
  created_at: string
  /** Last notifier update date */
  updated_at: string
  /** Name of the notifier */
  name: string
  /** Is the notifier active or not */
  active: boolean
  /** Notifier type */
  type: string
  /** Notification platform used by this notifer */
  platform_id: string
  /** Should the notifier accepts all alerts */
  send_all_alerts: boolean
  /** Should the notifier accepts all events */
  send_all_events: boolean
  /** List of events accepted by this notifier */
  selected_event_ids: string[]
  /** Notitication platform dependant additional data */
  type_data: Record<string, any>
}
