import { unpackData } from '../utils'
import { Client } from '..'

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

/**
 * Notification Platforms API Client
 */
export default class NotificationPlatforms {
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
   * List notification platforms
   * @see https://developers.scalingo.com/notification_platforms
   */
  list(): Promise<NotificationPlatform> {
    return unpackData(
      this._client.unauthenticatedClient().get('/notification_platforms'),
      'notification_platforms',
    )
  }
}
