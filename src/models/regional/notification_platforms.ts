export const EMAIL = 'email'
export const ROCKET_CHAT = 'rocket_chat'
export const SLACK = 'slack'
export const WEBHOOK = 'webhook'

export default {
  EMAIL,
  ROCKET_CHAT,
  SLACK,
  WEBHOOK,
}

export interface NotificationPlatform {
  /** Unique ID identifying the notification platform */
  id: string
  /** Name of the notification platform */
  name: string
  /** Human readable name for this notification platform */
  display_name: string
  /** URL to a logo for this notification platform */
  logo_url: string
  /** list of event type IDs accepted by this platform */
  available_event_ids: string[]
  /** Description of the platform */
  description: string
}
