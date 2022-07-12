import { unpackData } from "../utils";
/**
 * Events API Client
 */
export default class Events {
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client) {
        this._client = client;
    }
    /**
     * Return all events for all applications of user
     * @see https://developers.scalingo.com/events#list-current-user-events
     * @param opts Object that contains the index of the page and the number of elements per page
     */
    all(opts) {
        return unpackData(this._client.apiClient().get("/events", { params: opts }));
    }
    /**
     * Return all events of an application
     * @see https://developers.scalingo.com/events#list-the-events-of-an-app
     * @param appId Id of the current application
     * @param opts Object that contains the index of the page and the number of elements per page
     */
    for(appId, opts) {
        return unpackData(this._client.apiClient().get(`/apps/${appId}/events`, { params: opts }));
    }
    /**
     * Return one event of an application
     * @param appId Id of the current application
     * @param id Id of the event
     * @param opts Object that contains the index of the page and the number of elements per page
     */
    find(appId, id) {
        return unpackData(this._client.apiClient().get(`/apps/${appId}/events/${id}`), "event");
    }
    /**
     * Return a list of event types
     * @see https://developers.scalingo.com/event_types#list-the-event-types
     */
    listEventTypes() {
        return unpackData(this._client.unauthenticatedClient().get("event_types"), "event_types");
    }
    /**
     * Return a list of event catgories
     * @see https://developers.scalingo.com/event_categories#list-the-event-categories
     */
    listEventCategories() {
        return unpackData(this._client.unauthenticatedClient().get("event_categories"), "event_categories");
    }
}
//# sourceMappingURL=index.js.map