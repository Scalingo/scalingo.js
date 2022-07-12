import { PaginationMeta } from "../../meta";
export interface EventCategory {
    /** Unique id of event type */
    id: string;
    /** Camel case name of the type */
    name: string;
    /** Fancy name of the type */
    display_name: string;
    /** Order of “importance” when displayed */
    position: number;
}
export interface EventType {
    /** Unique id of event type */
    id: string;
    /** Category id of event type */
    category_id: string;
    /** Camel case name of the type */
    name: string;
    /** Fancy name of the type */
    display_name: string;
    /** Description of event */
    description: string;
}
export interface AppEvents {
    /** List of events */
    events: Event[];
    /** Meta information */
    meta: PaginationMeta;
}
export interface Event {
    /** Id of the event */
    id: string;
    /** Date of the event's creation */
    created_at: string;
    /** Information of the user */
    user: EventUser;
    /** Id of the application */
    app_id: string;
    /** Name of the application */
    app_name: string;
    /** Type of the event */
    type: string;
    /** Object that depend on the event type : https://developers.scalingo.com/events#events */
    type_data: Record<string, any>;
}
export interface EventUser {
    /** Username of the user */
    username: string;
    /** Email of the user */
    email: string;
    /** Id of the user */
    id: string;
}
//# sourceMappingURL=events.d.ts.map