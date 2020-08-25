export const ACCEPTED = 'accepted'
export const PENDING = 'pending'
export const USER_ACCOUNT_DELETED = 'user account deleted'

export default {
  ACCEPTED,
  PENDING,
  USER_ACCOUNT_DELETED,
}

export interface Collaborator {
  /** Id of the collaborator */
  id: string
  /** Email of the collaborator to invite */
  email: string
  /** Username of the person to invite */
  username: string
  /** Status of the invitation */
  status: string
}

export interface CollaboratorInvitation {
  /** Id of the collaborator */
  id: string
  /** Email of the collaborator to invite */
  email: string
  /** Username of the person to invite */
  username: string
  /** Status of the invitation */
  status: string
  /** Link of for the invitation */
  invitation_link: string
}
