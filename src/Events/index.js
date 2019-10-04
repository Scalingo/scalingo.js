import {unpackData} from '../utils.js'
import { APIError } from "../errors.js";

/**
 * Events API Client
 */
export default class Events {
  /**
   * Create a new Client for the Token API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client;
  }

  /**
   * Return all events of an application
   * @see https://developers.scalingo.com/events#list-the-events-of-an-app
   * @param {String} appId Id of the current application
   * @param {?EventsPaginationOpts} opts Object that contain the index of the page and the number of element per page
   * @return {Promise<AppEvents | APIError>}
   */
  for(appId, opts) {
    return unpackData(this._client.apiClient().get(`/apps/${appId}/events`, {params: opts}))
  }

  /**
   * Return a list of event types
   * @see https://developers.scalingo.com/event_types#list-the-event-types
   * @return {Promise<EventType[] | APIError>}
   */
  listEventTypes() {
    return unpackData(this._client.unauthenticatedClient().get('event_types'), "event_types")
  }

  /**
   * Return a list of event catgories
   * @see https://developers.scalingo.com/event_categories#list-the-event-categories
   * @return {Promise<EventCategory[] | APIError>}
   */
  listEventCategories() {
    return unpackData(this._client.unauthenticatedClient().get('event_categories'), "event_categories")
  }
}

/**
 * @typedef {Object} EventsPaginationOpts
 * @property {?Number} page Page number
 * @property {?Number} per_page Items per page
 * @property {?Number} from The N last hours - min: 1 max: 72
 */

/**
 * @typedef EventCategory Object of event category
 * @property {String} id Unique id of event type
 * @property {String} name Camel case name of the type
 * @property {String} display_name Fancy name of the type
 * @property {Number} position Order of “importance” when displayed
 */

/**
 * @typedef EventType Object of event type
 * @property {String} id Unique id of event type
 * @property {String} category_id Category id of event type
 * @property {String} name Camel case name of the type
 * @property {String} display_name Fancy name of the type
 * @property {String} description Description of event
 */

/**
 * @typedef AppEvents Object of the events and meta data
 * @property {Event[]} events List of events
 * @property {PaginationMeta} meta Meta information
 */

/**
 * @typedef Event Event information
 * @property {String} id Id of the event
 * @property {Date} created_at Date of the event's creation
 * @property {EventUser} user Information of the user
 * @property {String} app_id Id of the application
 * @property {String} app_name Name of the application
 * @property {String} type Type of the event
 * @property {Object} type_data Object that depend on the event type : https://developers.scalingo.com/events#events
 */

/**
 * @typedef {Object} EventUser
 * @property {String} username Username of the user
 * @property {String} email Email of the user
 * @property {String} id Id of the user
 */
