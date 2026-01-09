/**
 * Project Transfer Invitation status values
 */
export type ProjectTransferInvitationStatus =
  | "pending"
  | "accepted"
  | "declined"
  | "canceled"
  | "failed";

/**
 * Project Transfer Invitation model
 */
export interface ProjectTransferInvitation {
  /** UUID of the transfer invitation */
  id: string;
  /** Project ID */
  project_id: string;
  /** ID of the user who created the invitation */
  inviter_user_id: string;
  /** ID of the user who is invited */
  invited_user_id: string;
  /** Status of the invitation */
  status: ProjectTransferInvitationStatus;
  /** Reason for the current status (optional) */
  status_reason?: string;
  /** When the invitation expires */
  expires_at: string;
  /** When the invitation was created */
  created_at: string;
  /** When the invitation was last updated */
  updated_at: string;
}
