import { unpackData } from '../utils.js'

/**
 * Notification Platforms API Client
 */
export default class NotificationPlatforms {
  /**
   * Create a new Client for the Notification Platforms API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client
  }

  /**
   * List notification platforms
   * @see https://developers.scalingo.com/notification_platforms
   * @return {Promise<NotificationPlatform[] | APIError>}
   */
  list() {
    return unpackData(
      this._client.unauthenticatedClient().get('/notification_platforms'),
      'notification_platforms',
    )
  }
}

/**
 * @typedef {Object} NotificationPlatform
 * @property {String} id Unique ID identifying the notification platform
 * @property {String} name Name of the notification platform
 * @property {String} display_name Human readable name for this notification platform
 * @property {String} logo_url URL to a logo for this notification platform
 * @property {String[]} available_event_ids list of event type IDs accepted by
 * this platform
 * @property {String} description Description of the platform
 */
