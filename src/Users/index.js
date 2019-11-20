import { unpackData } from '../utils.js'

export default class Users {
  /**
   * Create a new Client for the Users API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client
  }

  /**
   * Fetch the current user account informations
   * @return {Promise<User | APIError>} Promise that when resolve return the user account informations
   */
  self() {
    return unpackData(this._client.authApiClient().get('/users/self'), 'user')
  }

  /**
   * Updates the current user account informations
   * @param {AccountUpdateParams} attributes - User attributes to update
   * @return {Promise<User | APIError>} Promise that when resolve return the user account informations
   */
  updateAccount(attributes) {
    return unpackData(
      this._client.authApiClient().put('/users/account', { user: attributes }),
      'user',
    )
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
 * @typedef {Object} AccountUpdateParams
 * @property {?String} email
 * @property {?String} username
 * @property {?String} company
 * @property {?String} location
 * @property {?String} fullname
 * @property {?Boolean} tos_accepted Did the user accept our TOS
 * @property {?Boolean} email_newsletter Did the user opt in to receive newsletter
 * @property {?String} company
 * @property {?String} location
 * @property {?String} fullname
 * @property {?String} password
 * @property {?String} password_confirmation
 * @property {?String} current_password
 */

/**
 * @typedef {Object} GithubProfile
 * @property {String} username Github Username
 * @property {?String} email Email linked to this Github account
 * @property {String} avatar_url
 * @property {String} profile_url
 */
