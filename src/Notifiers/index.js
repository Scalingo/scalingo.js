import { unpackData } from '../utils.js'

/**
 * Notifiers API Client
 */
export default class Notifiers {
  /**
   * Create a new Client for the Notifiers API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client
  }

  /**
   * Get list of notifiers of an application
   * @see https://developers.scalingo.com/notifiers#list-application-notifiers
   * @param {String} appId ID of the app to get the notifiers from
   * @return {Promise<Notifier[] | APIError>}
   */
  for(appId) {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/notifiers`),
      'notifiers',
    )
  }

  /**
   * Add a notifier to an application
   * @see https://developers.scalingo.com/notifiers#add-a-notifier
   * @param {String} appId ID of the app
   * @param {NotifierCreateParams} notifier New notifier configuration
   * @return {Promise<Notifier | APIError>}
   */
  create(appId, notifier) {
    return unpackData(
      this._client.apiClient().post(`/apps/${appId}/notifiers`, {
        notifier: notifier,
      }),
      'notifier',
    )
  }

  /**
   * Upgrade a notifier
   * @see https://developers.scalingo.com/notifiers#update-a-notifier
   * @param {String} appId ID of the current application
   * @param {String} notifierId ID of the current notifier
   * @param {NotifierUpdateParams} notifier Updated notifier configuration
   * @return {Promise<Notifier | APIError>}
   */
  update(appId, notifierId, notifier) {
    return unpackData(
      this._client.apiClient().patch(`/apps/${appId}/notifiers/${notifierId}`, {
        notifier: notifier,
      }),
      'notifier',
    )
  }

  /**
   * Remove a notifier
   * @see https://developers.scalingo.com/notifiers#remove-a-notifier
   * @param {String} appId ID of the current application
   * @param {String} notifierId ID of the notifier
   * @return {Promise<? | APIError>}
   */
  destroy(appId, notifierId) {
    return unpackData(
      this._client.apiClient().delete(`/apps/${appId}/notifiers/${notifierId}`),
    )
  }

  /**
   * Send a test notification to the notifier
   * @see https://developers.scalingo.com/notifiers#test-a-notifier
   * @param {String} appId The ID of the current application
   * @param {String} notifierId The ID of the notifier
   * @return {Promise<? | APIError>}
   */
  test(appId, notifierId) {
    return unpackData(
      this._client
        .apiClient()
        .post(`/apps/${appId}/notifiers/${notifierId}/test`),
    )
  }

  /**
   * Get a specific notifier
   * @param {String} appId The ID of the current application
   * @param {String} notifierId The ID of the notifier to get
   * @return {Promise<Notifier | APIError>}
   */
  get(appId, notifierId) {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/notifiers/${notifierId}`),
      'notifier',
    )
  }
}

/**
 * @typedef {Object} Notifier
 * @property {String} id Unique ID identifying the notifier
 * @property {String} app_id Unique ID referencing the app this notifier belongs to
 * @property {Date} created_at Creation date of the notifier
 * @property {Date} updated_at Last notifier update date
 * @property {String} name Name of the notifier
 * @property {boolean} active Is the notifier active or not
 * @property {String} type Notifier type
 * @property {String} platform_id Notification platform used by this notifer
 * @property {boolean} send_all_alerts Should the notifier accepts all alerts
 * @property {boolean} send_all_events Should the notifier accepts all events
 * @property {[]String} selected_event_ids List of events accepted by this notifier
 * @property {Object} type_data Notitication platform dependant additional data
 */

/**
 * @typedef {Object} NotifierCreateParams
 * @property {String} platform_id Notification platform used by this notifer
 * @property {String} name Name of the notifier
 * @property {?boolean} active Optional: Is the notifier active or not
 * @property {?boolean} send_all_alerts Optional: Should the notifier accepts all alerts
 * @property {?boolean} send_all_events Optional: Should the notifier accepts all events
 * @property {?[]String} selected_event_ids Optional: List of events accepted by this notifier
 * @property {?Object} type_data Optional: Notitication platform dependant additional data
 */

/**
 * @typedef {Object} NotifierUpdateParams
 * @property {String} name Name of the notifier
 * @property {?boolean} active Optional: Is the notifier active or not
 * @property {?boolean} send_all_alerts Optional: Should the notifier accepts all alerts
 * @property {?boolean} send_all_events Optional: Should the notifier accepts all events
 * @property {?[]String} selected_event_ids Optional: List of events accepted by this notifier
 * @property {?Object} type_data Optional: Notitication platform dependant additional data
 */
