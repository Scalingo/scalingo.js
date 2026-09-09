import { PaginationMeta } from "src/meta";

/** @see https://developers.scalingo.com/organizations */
export interface Organization {
  /** Unique organization ID (uuid) */
  id: string;
  /** Name of the organization */
  name: string;
  /** Slug of the organization */
  slug: string;
  /** Creation date of the organization */
  created_at: string;
  /** Organization-specific flags */
  flags: Record<string, boolean>;
}

/** Actor of an organization event */
export interface OrganizationEventActor {
  /** Unique id (uuid) of the actor */
  id: string;
  /** Username of the actor */
  username?: string;
  /** Email of the actor */
  email?: string;
}

/** Target resource of an organization event */
export interface OrganizationEventTarget {
  /** Id of the target resource */
  id: string;
  /** Type of the target resource */
  type: string;
}

/** A single organization timeline event */
export interface OrganizationEvent {
  /** Id of the event */
  id: string;
  /** Name of the event, eg: "organization.update" */
  event_name: string;
  /** User who triggered the event */
  actor: OrganizationEventActor;
  /** Resource impacted by the event */
  target: OrganizationEventTarget;
  /** Changes applied by the event, keyed by attribute name */
  changes: Record<string, unknown>;
  /** Date of the event's creation */
  created_at: string;
}

/** Paginated list of organization events */
export interface PaginatedOrganizationEvents {
  /** List of events */
  events: OrganizationEvent[];
  /** Meta information */
  meta: PaginationMeta;
}
