import { unpackData } from '../utils'
import { Client, APIResponse } from '..'
import { PaginationMeta } from '../meta'

export interface EventsPaginationOpts {
  /** Page number */
  page?: number
  /** Items per page */
  per_page?: number
  /** The N last hours - min: 1 max: 72 */
  from?: number
}

export interface EventCategory {
  /** Unique id of event type */
  id: string
  /** Camel case name of the type */
  name: string
  /** Fancy name of the type */
  display_name: string
  /** Order of “importance” when displayed */
  position: number
}
export interface EventType {
  /** Unique id of event type */
  id: string
  /** Category id of event type */
  category_id: string
  /** Camel case name of the type */
  name: string
  /** Fancy name of the type */
  display_name: string
  /** Description of event */
  description: string
}

export interface AppEvents {
  /** List of events */
  events: Event[]
  /** Meta information */
  meta: PaginationMeta
}

export interface Event {
  /** Id of the event */
  id: string
  /** Date of the event's creation */
  created_at: string
  /** Information of the user */
  user: EventUser
  /** Id of the application */
  app_id: string
  /** Name of the application */
  app_name: string
  /** Type of the event */
  type: string
  /** Object that depend on the event type : https://developers.scalingo.com/events#events */
  type_data: Record<string, any>
}

export interface EventUser {
  /** Username of the user */
  username: string
  /** Email of the user */
  email: string
  /** Id of the user */
  id: string
}

/**
 * Events API Client
 */
export default class Events {
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
   * Return all events for all applications of user
   * @see https://developers.scalingo.com/events#list-current-user-events
   * @param opts Object that contains the index of the page and the number of elements per page
   */
  all(opts?: EventsPaginationOpts): APIResponse<AppEvents> {
    return unpackData(this._client.apiClient().get('/events', { params: opts }))
  }

  /**
   * Return all events of an application
   * @see https://developers.scalingo.com/events#list-the-events-of-an-app
   * @param appId Id of the current application
   * @param opts Object that contains the index of the page and the number of elements per page
   */
  for(appId: string, opts?: EventsPaginationOpts): APIResponse<AppEvents> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/events`, { params: opts }),
    )
  }

  /**
   * Return a list of event types
   * @see https://developers.scalingo.com/event_types#list-the-event-types
   */
  listEventTypes(): APIResponse<EventType[]> {
    return unpackData(
      this._client.unauthenticatedClient().get('event_types'),
      'event_types',
    )
  }

  /**
   * Return a list of event catgories
   * @see https://developers.scalingo.com/event_categories#list-the-event-categories
   */
  listEventCategories(): APIResponse<EventCategory[]> {
    return unpackData(
      this._client.unauthenticatedClient().get('event_categories'),
      'event_categories',
    )
  }
}
