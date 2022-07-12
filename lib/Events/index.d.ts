import { Client } from "..";
import { AppEvents, EventType, EventCategory, Event } from "../models/regional/events";
import { IndexParams } from "../params/regional/events";
/**
 * Events API Client
 */
export default class Events {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * Return all events for all applications of user
     * @see https://developers.scalingo.com/events#list-current-user-events
     * @param opts Object that contains the index of the page and the number of elements per page
     */
    all(opts?: IndexParams): Promise<AppEvents>;
    /**
     * Return all events of an application
     * @see https://developers.scalingo.com/events#list-the-events-of-an-app
     * @param appId Id of the current application
     * @param opts Object that contains the index of the page and the number of elements per page
     */
    for(appId: string, opts?: IndexParams): Promise<AppEvents>;
    /**
     * Return one event of an application
     * @param appId Id of the current application
     * @param id Id of the event
     * @param opts Object that contains the index of the page and the number of elements per page
     */
    find(appId: string, id: string): Promise<Event>;
    /**
     * Return a list of event types
     * @see https://developers.scalingo.com/event_types#list-the-event-types
     */
    listEventTypes(): Promise<EventType[]>;
    /**
     * Return a list of event catgories
     * @see https://developers.scalingo.com/event_categories#list-the-event-categories
     */
    listEventCategories(): Promise<EventCategory[]>;
}
//# sourceMappingURL=index.d.ts.map