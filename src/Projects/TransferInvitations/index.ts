import { Client } from "../..";
import { ProjectTransferInvitation } from "../../models/regional/project-transfer-invitations";
import {
  CreateParams,
  ListParams,
} from "../../params/regional/project-transfer-invitations";
import { unpackData } from "../../utils";

/**
 * Project Transfer Invitations API Client
 */
export default class TransferInvitations {
  /** Scalingo API Client */
  _client: Client;
  /** Project ID */
  _projectId: string;

  /**
   * Create a new "thematic" client
   * @param client Scalingo API Client
   * @param projectId Project ID
   */
  constructor(client: Client, projectId: string) {
    this._client = client;
    this._projectId = projectId;
  }

  /**
   * List all transfer invitations for the project
   * @see https://developers.scalingo.com/projects#list-all-your-project-transfer-invitations
   * @param params List parameters (optional)
   * @return Promise that when resolved returns a ProjectTransferInvitation array.
   */
  all(params?: ListParams): Promise<ProjectTransferInvitation[]> {
    const queryParams: Record<string, string> = {};
    if (params?.status) {
      queryParams.status = params.status;
    }

    const queryString =
      Object.keys(queryParams).length > 0
        ? `?${new URLSearchParams(queryParams).toString()}`
        : "";

    return unpackData(
      this._client
        .apiClient()
        .get(`/projects/${this._projectId}/transfer_invitations${queryString}`),
      "transfer_invitations",
    );
  }

  /**
   * Fetch a specific transfer invitation
   * @see https://developers.scalingo.com/projects#get-a-project-transfer-invitation
   * @param id ID of the transfer invitation
   * @return Promise that when resolved returns a ProjectTransferInvitation.
   */
  find(id: string): Promise<ProjectTransferInvitation> {
    return unpackData(
      this._client
        .apiClient()
        .get(`/projects/${this._projectId}/transfer_invitations/${id}`),
      "transfer_invitation",
    );
  }

  /**
   * Create a new transfer invitation
   * @see https://developers.scalingo.com/projects#create-a-project-transfer-invitation
   * @param payload Transfer invitation creation parameters
   * @return Promise that when resolved returns the created ProjectTransferInvitation.
   */
  create(payload: CreateParams): Promise<ProjectTransferInvitation> {
    return unpackData(
      this._client
        .apiClient()
        .post(`/projects/${this._projectId}/transfer_invitations`, {
          transfer_invitation: payload,
        }),
      "transfer_invitation",
    );
  }

  /**
   * Cancel a transfer invitation
   * @see https://developers.scalingo.com/projects#cancel-a-project-transfer-invitation-owner-of-project
   * @param id ID of the transfer invitation
   * @return Promise that when resolved returns the cancelled ProjectTransferInvitation.
   */
  cancel(id: string): Promise<ProjectTransferInvitation> {
    return unpackData(
      this._client
        .apiClient()
        .post(
          `/projects/${this._projectId}/transfer_invitations/${id}/cancel`,
        ),
      "transfer_invitation",
    );
  }

  /**
   * Accept a transfer invitation
   * @see https://developers.scalingo.com/projects#accept-a-project-transfer-invitation-member-of-project
   * @param id ID of the transfer invitation
   * @return Promise that when resolved returns the accepted ProjectTransferInvitation.
   */
  accept(id: string): Promise<ProjectTransferInvitation> {
    return unpackData(
      this._client
        .apiClient()
        .post(`/projects/${this._projectId}/transfer_invitations/${id}/accept`),
      "transfer_invitation",
    );
  }

  /**
   * Decline a transfer invitation
   * @see https://developers.scalingo.com/projects#decline-a-project-transfer-invitation-member-of-project
   * @param id ID of the transfer invitation
   * @return Promise that when resolved returns the declined ProjectTransferInvitation.
   */
  decline(id: string): Promise<ProjectTransferInvitation> {
    return unpackData(
      this._client
        .apiClient()
        .post(
          `/projects/${this._projectId}/transfer_invitations/${id}/decline`,
        ),
      "transfer_invitation",
    );
  }
}
