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
  /** Email of the collaborator - required in the invite payload */
  email: string;
  /** Unique User ID of the user who accepted the collaboration */
  user_id: string;
  /** ID of the application owning the collaborator */
  app_id: string;
  /** Username of the collaborator */
  username: string;
  /** Status of the invitation */
  status: string;
  /** Name of the application owning the collaborator */
  app_name?: string;
  /** Collaborator with limited access - true if the collaborator has limited access, false otherwise */
  is_limited?: boolean;
  /** Link for the invitation */
  invitation_link?: string;
  /** Two Factor Authentication status of the collaborator */
  tfa_status?: boolean;
}
