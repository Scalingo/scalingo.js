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
}

/**
 * @typedef {Object} Collaborator
 * @property {String} id Id of the collaborator
 * @property {String} email Email of the collaborator to invite
 * @property {String} username Username of the person to invite
 * @property {String} status Status of the invitation
 */
