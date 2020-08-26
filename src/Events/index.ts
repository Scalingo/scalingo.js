import { unpackData } from "../utils";
import { Client } from "..";
import { AppEvents, EventType, EventCategory } from "../models/regional/events";
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
  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Return all events for all applications of user
   * @see https://developers.scalingo.com/events#list-current-user-events
   * @param opts Object that contains the index of the page and the number of elements per page
   */
  all(opts?: IndexParams): Promise<AppEvents> {
    return unpackData(
      this._client.apiClient().get("/events", { params: opts })
    );
  }

  /**
   * Return all events of an application
   * @see https://developers.scalingo.com/events#list-the-events-of-an-app
   * @param appId Id of the current application
   * @param opts Object that contains the index of the page and the number of elements per page
   */
  for(appId: string, opts?: IndexParams): Promise<AppEvents> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/events`, { params: opts })
    );
  }

  /**
   * Return a list of event types
   * @see https://developers.scalingo.com/event_types#list-the-event-types
   */
  listEventTypes(): Promise<EventType[]> {
    return unpackData(
      this._client.unauthenticatedClient().get("event_types"),
      "event_types"
    );
  }

  /**
   * Return a list of event catgories
   * @see https://developers.scalingo.com/event_categories#list-the-event-categories
   */
  listEventCategories(): Promise<EventCategory[]> {
    return unpackData(
      this._client.unauthenticatedClient().get("event_categories"),
      "event_categories"
    );
  }
}
