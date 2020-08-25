import { unpackData } from '../utils'
import { Client } from '..'
import { Notifier } from '../models/regional/notifiers'

export interface NotifierCreateParams {
  /** Notification platform used by this notifer */
  platform_id: string
  /** Name of the notifier */
  name: string
  /**  Optional: Is the notifier active or not */
  active?: boolean
  /**  Optional: Should the notifier accepts all alerts */
  send_all_alerts?: boolean
  /**  Optional: Should the notifier accepts all events */
  send_all_events?: boolean
  /**  Optional: List of events accepted by this notifier */
  selected_event_ids?: string[]
  /**  Optional: Notitication platform dependant additional data */
  type_data?: Record<string, any>
}

export interface NotifierUpdateParams {
  /** Name of the notifier */
  name: string
  /**  Optional: Is the notifier active or not */
  active?: boolean
  /**  Optional: Should the notifier accepts all alerts */
  send_all_alerts?: boolean
  /**  Optional: Should the notifier accepts all events */
  send_all_events?: boolean
  /**  Optional: List of events accepted by this notifier */
  selected_event_ids?: string[]
  /**  Optional: Notitication platform dependant additional data */
  type_data?: Record<string, any>
}

/**
 * Notifiers API Client
 */
export default class Notifiers {
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
   * Get list of notifiers of an application
   * @see https://developers.scalingo.com/notifiers#list-application-notifiers
   * @param appId ID of the app to get the notifiers from
   */
  for(appId: string): Promise<Notifier[]> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/notifiers`),
      'notifiers',
    )
  }

  /**
   * Add a notifier to an application
   * @see https://developers.scalingo.com/notifiers#add-a-notifier
   * @param appId ID of the app
   * @param notifier New notifier configuration
   */
  create(appId: string, notifier: NotifierCreateParams): Promise<Notifier> {
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
   * @param appId ID of the current application
   * @param notifierId ID of the current notifier
   * @param notifier Updated notifier configuration
   */
  update(
    appId: string,
    notifierId: string,
    notifier: NotifierUpdateParams,
  ): Promise<Notifier> {
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
   * @param appId ID of the current application
   * @param notifierId ID of the notifier
   */
  destroy(appId: string, notifierId: string): Promise<void> {
    return unpackData(
      this._client.apiClient().delete(`/apps/${appId}/notifiers/${notifierId}`),
    )
  }

  /**
   * Send a test notification to the notifier
   * @see https://developers.scalingo.com/notifiers#test-a-notifier
   * @param appId The ID of the current application
   * @param notifierId The ID of the notifier
   */
  test(appId: string, notifierId: string): Promise<void> {
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
   */
  get(appId: string, notifierId: string): Promise<Notifier> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/notifiers/${notifierId}`),
      'notifier',
    )
  }
}
