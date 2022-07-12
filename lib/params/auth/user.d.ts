export interface UpdateParams {
    email?: string;
    username?: string;
    company?: string;
    location?: string;
    fullname?: string;
    /** Did the user accept our TOS */
    tos_accepted?: boolean;
    /** Did the user opt in to receive newsletter */
    email_newsletter?: boolean;
    password?: string;
    password_confirmation?: string;
    current_password?: string;
}
export interface DeletionParams {
    token: string;
    reason?: string | null;
    details?: string | null;
}
//# sourceMappingURL=user.d.ts.map