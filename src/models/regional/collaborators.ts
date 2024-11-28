export const ACCEPTED = "accepted";
export const PENDING = "pending";
export const USER_ACCOUNT_DELETED = "user account deleted";

export default {
  ACCEPTED,
  PENDING,
  USER_ACCOUNT_DELETED,
};

export interface Collaborator {
  /** Id of the collaborator */
  id: string;
  /** Email of the collaborator to invite */
  email: string;
  /** Unique User ID of the user who accepted the collaboration */
  user_id: string;
  /** ID of the application owning the collaborator */
  app_id: string;
  /** Username of the person to invite */
  username: string;
  /** Status of the invitation */
  status: string;
  /** Name of the application owning the collaborator */
  app_name?: string;
}

export interface CollaboratorInvitation {
  /** Id of the collaborator */
  id: string;
  /** Email of the collaborator to invite */
  email: string;
  /** Username of the person to invite */
  username: string;
  /** Status of the invitation */
  status: string;
  /** Link of for the invitation */
  invitation_link: string;
}
