export declare const ACCEPTED = "accepted";
export declare const PENDING = "pending";
export declare const USER_ACCOUNT_DELETED = "user account deleted";
declare const _default: {
    ACCEPTED: string;
    PENDING: string;
    USER_ACCOUNT_DELETED: string;
};
export default _default;
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
//# sourceMappingURL=collaborators.d.ts.map