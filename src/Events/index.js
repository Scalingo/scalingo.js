import axios from "axios"
import {unpackData} from '../utils.js'
import { APIError } from "../errors.js";

/**
 * Events API Client
 */
export default class Tokens {
  /**
   * Create a new Client for the Token API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client;
  }

  /**
   * Return all events of an application
   * @see http://developers.scalingo.com/events#list-the-events-of-an-app
   * @param {?Number} from The N last hours - min: 1 max: 72
   * @param {String} appId Id of the current application
   * @return {Promise<Event | APIError>}
   */
  for(appId, from) {
    if (from)
      return unpackData(this._client.apiClient().get(`/apps/${appId}/events?from=${from}`))
    else
      return unpackData(this._client.apiClient().get(`/apps/${appId}/events`))
  }

  /**
   * Return all events for a specific user
   * @see http://developers.scalingo.com/events#list-current-user-events
   * @return {Promise<Event | APIError>}
   */
  forUser() {
    return unpackData(this._client.apiClient().get('events'))
  }

  /**
   * Return a list of event types
   * @see http://developers.scalingo.com/event_types#list-the-event-types
   * @return {Promise<EventType[] | APIError>}
   */
  listEventTypes() {
    return unpackData(this._client.unauthenticatedClient().get('event_types'), "event_types")
  }

  /**
   * Return a list of event catgories
   * @see http://developers.scalingo.com/event_categories#list-the-event-categories
   * @return {Promise<EventCategory[] | APIError>}
   */
  listEventCategories() {
    return unpackData(this._client.unauthenticatedClient().get('event_categories'), "event_categories")
  }
}

/**
 * @typedef EventCategory Object of event category
 * @property {String} id Unique id of event type
 * @property {String} name Camel case name of the type
 * @property {String} display_name Fancy name of the type
 * @property {String} position Order of “importance” when displayed
 */

/**
 * @typedef EventType Object of event type
 * @property {String} id Unique id of event type
 * @property {String} category_id Category id of event type
 * @property {String} name Camel case name of the type
 * @property {String} display_name Fancy name of the type
 * @property {String} description Description these events are produced
 */

/**
 * @typedef Event Object of the events and meta data
 * @property {Events[]} events List of events
 * @property {Meta} meta Meta informations
 */

/**
 * @typedef Meta Meta informations
 * @property {Pagination} pagination Pagination informations
 */

/**
 * @typedef Pagination Pagination informations
 * @property {String} current_page Index of the current page
 * @property {String} next_page Index of the next page
 * @property {?String} prev_page Index of the previous page
 * @property {String} total_pages Total number of pages
 * @property {String} total_count Total number of items on every pages
 */

/**
 * @typedef Events Evet information
 * @property {String} id Id of the event
 * @property {Date} created_at Date of the event's creation
 * @property {User} user Informations of the user 
 * @property {String} app_id Id of the application
 * @property {String} app_name Name of the application
 * @property {String} type Type of the event
 * @property {TypeData} type_data Informations about the type 
 */

 /**
  * @typedef TypeData Type data informations
  * @property {String} command Type command
  */