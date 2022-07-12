export declare const EMAIL = "email";
export declare const ROCKET_CHAT = "rocket_chat";
export declare const SLACK = "slack";
export declare const WEBHOOK = "webhook";
declare const _default: {
    EMAIL: string;
    ROCKET_CHAT: string;
    SLACK: string;
    WEBHOOK: string;
};
export default _default;
export interface NotificationPlatform {
    /** Unique ID identifying the notification platform */
    id: string;
    /** Name of the notification platform */
    name: string;
    /** Human readable name for this notification platform */
    display_name: string;
    /** URL to a logo for this notification platform */
    logo_url: string;
    /** list of event type IDs accepted by this platform */
    available_event_ids: string[];
    /** Description of the platform */
    description: string;
}
//# sourceMappingURL=notification_platforms.d.ts.map