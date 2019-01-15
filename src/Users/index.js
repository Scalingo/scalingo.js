import {unpackData} from '../utils.js'

export default class Users {
  /**
   * Create a new Client for the Users API
   * @param {Client} client - Scalingo API Client
   */

  constructor(client) {
    this._client = client;
  }

  /**
   * Fetch the current user account informations
   * @return {Promise<User | APIError>} Promise that when resolve return the user account informations
   */
  self() {
    return unpackData(this._client.authApiClient().get('/users/self'), "user")
  }
}

/**
 * @typedef {Object} User
 * @property {String} id
 * @property {String} email
 * @property {String} username
 * @property {String} uuid
 * @property {?String} company
 * @property {?String} location
 * @property {String} fullname
 * @property {?GithubProfile} github Github profile of the user
 * @property {Boolean} tos_accepted Did the user accept our TOS
 */
/**
 * @typedef {Object} GithubProfile
 * @property {String} username Github Username
 * @property {?String} email Email linked to this Github account
 * @property {String} avatar_url
 * @property {String} profile_url
 */
