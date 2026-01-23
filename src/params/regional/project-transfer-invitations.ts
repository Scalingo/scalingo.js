import { ProjectTransferInvitationStatus } from "../../models/regional/project-transfer-invitations";

/**
 * Parameters for creating a project transfer invitation
 */
export interface CreateParams {
  /** ID of the user to invite */
  invited_user_id: string;
}

/**
 * Parameters for listing project transfer invitations
 */
export interface ListParams {
  /** Filter by status (optional). Use "all" to get all invitations */
  status?: ProjectTransferInvitationStatus | "all";
}
