import {unpackData} from "../utils";

/**
 * Collaborators API Client
 */
export default class Collaborators {
  /**
   * Create new Client for the Collaborators API
   * @params {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client
  }
  
  /**
   * List all collaborators of an application
   * @see http://developers.scalingo.com/collaborators#list-collaborators-of-an-app
   * @params {String} appId ID of the app to get collaborators list
   * @return {Promise<Collaborator[] | APIError>}
   */
  for(appId) {
    return unpackData(this._client.apiClient().get(`/apps/${appId}/collaborators`), "collaborators")
  }
  
  /**
   * Remove a collaborator
   * @see http://developers.scalingo.com/collaborators#delete-a-collaborator
   * @params {String} appId ID of the application
   * @params {String} collaboratorId ID of the collaborator to remove
   * @return {Promise<?APIError>}
   */
  destroy(appId, collaboratorId) {
    return unpackData(this._client.apiClient().delete(`/apps/${appId}/collaborators/${collaboratorId}`))
  }

  /**
   * Invite collaborators to an application
   * @see http://developers.scalingo.com/collaborators#invite-collaborator-to-work-on-an-app
   * @params {String} appId Id of the application
   * @params {String} email Email of the collaborator to invite
   * @return {Promise<CollaboratorInvitation | APIError>}
   */
  invite(appId, email) {
    return unpackData(this._client.apiClient().post(`/apps/${appId}/collaborators`, {collaborator: {email: email}}))
  }

  /**
   * Accept invitation to an application
   * @see http://developers.scalingo.com/collaborators#accept-an-invitation-to-collaborate
   * @params {String} token Token of the invitation returned when adding a collaborator
   * @return {App | APIError}
   */
  inviteAccept(token) {
    return unpackData(this._client.apiClient().get('/apps/collaboration', {params: {token: token}}))
  }
}

/**
 * @typedef {Object} CollaboratorInvitation
 * @property {String} id Id of the collaborator
 * @property {String} email Email of the collaborator to invite
 * @property {String} username Username of the person to invite
 * @property {String} status Status of the invitation
 * @property {String} invitation_link Link of for the invitation
 */

/**
 * @typedef {Object} Collaborator
 * @property {String} id Id of the collaborator
 * @property {String} email Email of the collaborator to invite
 * @property {String} username Username of the person to invite
 * @property {String} status Status of the invitation
 */
