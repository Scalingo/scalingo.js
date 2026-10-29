import { Client } from "..";
import {
  Organization,
  OrganizationInvitation,
  OrganizationMember,
  PaginatedOrganizationEvents,
} from "../models/auth/organizations";
import {
  BulkCreateInvitationsParams,
  CreateInvitationParams,
  CreateParams,
  EventsParams,
  UpdateParams,
} from "../params/auth/organizations";
import { unpackData } from "../utils";

/**
 * Organizations API Client
 */
export default class Organizations {
  /** Scalingo API Client */
  _client: Client;

  /**
   * Create a new "thematic" client
   * @param client Scalingo API Client
   */
  constructor(client: Client) {
    this._client = client;
  }

  /**
   * List all organizations the current user is a member of
   * @return A list of organizations
   */
  all(): Promise<Organization[]> {
    return unpackData(
      this._client.authApiClient().get("/organizations"),
      "organizations",
    );
  }

  /**
   * Get an organization
   * @param reference ID or slug of the organization
   * @return Promise that when resolved returns the organization.
   */
  show(reference: string): Promise<Organization> {
    return unpackData(
      this._client.authApiClient().get(`/organizations/${reference}`),
      "organization",
    );
  }

  /**
   * Create a new organization
   * @param payload Organization creation parameters
   * @return Promise that when resolved returns the created organization.
   */
  create(payload: CreateParams): Promise<Organization> {
    return unpackData(
      this._client
        .authApiClient()
        .post("/organizations", { organization: payload }),
      "organization",
    );
  }

  /**
   * Update an organization
   * @param id ID of the organization
   * @param payload Organization update parameters
   * @return Promise that when resolved returns the updated organization.
   */
  update(id: string, payload: UpdateParams): Promise<Organization> {
    return unpackData(
      this._client
        .authApiClient()
        .patch(`/organizations/${id}`, { organization: payload }),
      "organization",
    );
  }

  /**
   * Delete an organization
   * @param id ID of the organization
   */
  destroy(id: string): Promise<void> {
    return unpackData(
      this._client.authApiClient().delete(`/organizations/${id}`),
    );
  }

  /**
   * Check whether the current user is authorized to perform an action on an organization
   * @param id ID of the organization
   * @param scope Scope to check authorization on, eg: "read:organization"
   * @return Promise that when resolved returns whether the action is authorized.
   */
  can(id: string, scope: string): Promise<boolean> {
    return unpackData(
      this._client
        .authApiClient()
        .get(`/organizations/${id}/can`, { params: { scope } }),
      "can",
    );
  }

  /**
   * List the members of an organization. Only organization admins are allowed to do so.
   * @param id ID of the organization
   * @return Promise that when resolved returns the members of the organization.
   */
  members(id: string): Promise<OrganizationMember[]> {
    return unpackData(
      this._client.authApiClient().get(`/organizations/${id}/members`),
      "members",
    );
  }

  /**
   * List the pending invitations of an organization, expired ones included.
   * Only organization admins are allowed to do so.
   * @param id ID of the organization
   * @return Promise that when resolved returns the invitations of the organization.
   */
  invitations(id: string): Promise<OrganizationInvitation[]> {
    return unpackData(
      this._client.authApiClient().get(`/organizations/${id}/invitations`),
      "invitations",
    );
  }

  /**
   * Invite a person to join an organization.
   * Only organization admins are allowed to do so.
   * @param id ID of the organization
   * @param payload Invitation creation parameters
   * @return Promise that when resolved returns the created invitation.
   */
  createInvitation(
    id: string,
    payload: CreateInvitationParams,
  ): Promise<OrganizationInvitation> {
    return unpackData(
      this._client
        .authApiClient()
        .post(`/organizations/${id}/invitations`, { invitation: payload }),
      "invitation",
    );
  }

  /**
   * Invite several people to join an organization at once.
   * Only organization admins are allowed to do so.
   * If some invitations cannot be created, the request fails with a 422 whose
   * payload contains the created `invitations` and the `errors` indexed by email.
   * @param id ID of the organization
   * @param payload Invitations creation parameters
   * @return Promise that when resolved returns the created invitations.
   */
  bulkCreateInvitations(
    id: string,
    payload: BulkCreateInvitationsParams,
  ): Promise<OrganizationInvitation[]> {
    return unpackData(
      this._client
        .authApiClient()
        .post(`/organizations/${id}/invitations/bulk`, { invitation: payload }),
      "invitations",
    );
  }

  /**
   * Cancel a pending invitation, or delete an expired one.
   * Only organization admins are allowed to do so.
   * @param id ID of the organization
   * @param invitationId ID of the invitation
   */
  destroyInvitation(id: string, invitationId: string): Promise<void> {
    return unpackData(
      this._client
        .authApiClient()
        .delete(`/organizations/${id}/invitations/${invitationId}`),
    );
  }

  /**
   * Return the timeline events of an organization
   * @param id ID of the organization
   * @param opts Object that contains the pagination information
   * @return Promise that when resolved returns the paginated events of the organization.
   */
  events(
    id: string,
    opts?: EventsParams,
  ): Promise<PaginatedOrganizationEvents> {
    return unpackData(
      this._client
        .authApiClient()
        .get(`/organizations/${id}/events`, { params: opts }),
    );
  }
}
