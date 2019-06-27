import axios from "axios"
import {unpackData} from '../utils.js'

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
   * @param {?Number} from The N last hours - min: 1 max: 72
   * @param {String} appId Id of the current application
   * @return {Event}
   */
  for(appId, from) {
    if (from)
      return unpackData(this._client.apiClient().get(`/apps/${appId}/events?from=${from}`))
    else
      return unpackData(this._client.apiClient().get(`/apps/${appId}/events`))
  }
}

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