import { unpackData } from '../utils'
import { Client } from '..'

import { User } from '../models/auth/user'

export interface AccountUpdateParams {
  email?: string
  username?: string
  company?: string
  location?: string
  fullname?: string
  /** Did the user accept our TOS */
  tos_accepted?: boolean
  /** Did the user opt in to receive newsletter */
  email_newsletter?: boolean
  password?: string
  password_confirmation?: string
  current_password?: string
}

export class Users {
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
   * Fetch the current user account informations
   * @return Promise that when resolve return the user account informations
   */
  self(): Promise<User> {
    return unpackData(this._client.authApiClient().get('/users/self'), 'user')
  }

  /**
   * Updates the current user account informations
   * @param attributes User attributes to update
   * @return Promise that when resolve return the user account informations
   */
  updateAccount(attributes: AccountUpdateParams): Promise<User> {
    return unpackData(
      this._client.authApiClient().put('/users/account', { user: attributes }),
      'user',
    )
  }

  /**
   * Request the account's deletion. Requires a subsequent validation done via email.
   */
  requestAccountDeletion(): Promise<User> {
    return unpackData(this._client.authApiClient().post('/users/delete'))
  }
}

export default Users
