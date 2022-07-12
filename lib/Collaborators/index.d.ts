import { Client } from "..";
import { App } from "../models/regional/apps";
import { Collaborator, CollaboratorInvitation } from "../models/regional/collaborators";
/**
 * Collaborators API Client
 */
export default class Collaborators {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * List all collaborators of an application
     * @see https://developers.scalingo.com/collaborators#list-collaborators-of-an-app
     * @param appId ID of the app to get collaborators list}
     */
    for(appId: string): Promise<Collaborator[]>;
    /**
     * Remove a collaborator
     * @see https://developers.scalingo.com/collaborators#delete-a-collaborator
     * @param appId ID of the application
     * @param collaboratorId ID of the collaborator to remove
     */
    destroy(appId: string, collaboratorId: string): Promise<void>;
    /**
     * Invite collaborators to an application
     * @see https://developers.scalingo.com/collaborators#invite-collaborator-to-work-on-an-app
     * @param appId Id of the application
     * @param email Email of the collaborator to invite
     */
    invite(appId: string, email: string): Promise<CollaboratorInvitation>;
    /**
     * Accept invitation to an application
     * @see https://developers.scalingo.com/collaborators#accept-an-invitation-to-collaborate
     * @params {String} token Token of the invitation returned when adding a collaborator
     */
    inviteAccept(token: string): Promise<App>;
}
//# sourceMappingURL=index.d.ts.map