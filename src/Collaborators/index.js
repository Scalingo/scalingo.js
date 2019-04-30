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
   * @return {Promise<Collaborators[] | APIError>}
   */
  for(collaborators) {
  
  }
}

/**
 * @typedef {Array} Collaborators
 * @property {String} email Email of the collaborator to invite
 */
