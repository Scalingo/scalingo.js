import { unpackData } from '@/utils'
import { Client, APIResponse } from '..'

export interface User {
  id: string
  email: string
  username: string
  uuid: string
  company: string
  location: string
  fullname: string

  /** Github profile of the user */
  github: GithubProfile

  /** Did the user accept our TOS */
  tos_accepted: boolean
}

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

export interface GithubProfile {
  /** Github Username */
  username: string
  /** Email linked to this Github account */
  email?: string

  avatar_url: string
  profile_url: string
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
  self(): APIResponse<User> {
    return unpackData(this._client.authApiClient().get('/users/self'), 'user')
  }

  /**
   * Updates the current user account informations
   * @param attributes User attributes to update
   * @return Promise that when resolve return the user account informations
   */
  updateAccount(attributes: AccountUpdateParams): APIResponse<User> {
    return unpackData(
      this._client.authApiClient().put('/users/account', { user: attributes }),
      'user',
    )
  }
}

export default Users
