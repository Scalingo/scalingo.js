export interface User {
    id: string;
    email: string;
    username: string;
    uuid: string;
    company: string | null;
    location: string | null;
    fullname: string;
    /** Github profile of the user */
    github: GithubProfile;
    /** Did the user accept our TOS */
    tos_accepted: boolean;
    email_newsletter: boolean;
    profile_valid: boolean;
    confirmed: boolean;
    unconfirmed_email: string | null;
    created_at: string;
    free_trial_started_at: string;
    free_trial_end_time: string;
    /** User-specific flags */
    flags: Record<string, boolean>;
    limits: Record<string, string | number>;
    referral_url: string;
    referral_clicks: number;
    suspended_at: string | null;
    suspension_reason: string | null;
    preferences: UserPreferences;
    contracts: Record<string, boolean>;
    new_contracts: Record<string, boolean>;
}
export interface GithubProfile {
    /** Github Username */
    username: string;
    /** Email linked to this Github account */
    email?: string;
    avatar_url: string;
    profile_url: string;
}
export interface UserPreferences {
    time_zone: string | null;
    locale: string | null;
    stream_logs: boolean;
    sticky_search: boolean;
    app_sort_key: string | null;
    theme: string | null;
    logs_font_size: string | null;
}
//# sourceMappingURL=user.d.ts.map