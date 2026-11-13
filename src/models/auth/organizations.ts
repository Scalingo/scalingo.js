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
  /** Organization-specific limits */
  limits: Record<string, number>;
  /**
   * Role of the current user in the organization.
   * Only returned by the list endpoint (`all()`).
   */
  role?: OrganizationMemberRole;
  /**
   * ID of the requester's own active membership in the organization.
   * Only returned by the list endpoint (`all()`). This is the ID expected
   * by `destroyMember()`.
   */
  membership_id?: string;
  /**
   * Active administrators of the organization.
   * Only returned by the list endpoint (`all()`) when explicitly
   * requested with `with_admins: true`.
   */
  admins?: OrganizationAdmin[];
}

/** Role of a member within an organization */
export type OrganizationMemberRole = "admin" | "member";

/** Administrator of an organization, as returned by the list endpoint with `with_admins: true` */
export interface OrganizationAdmin {
  /** Unique id (uuid) of the user */
  id: string;
  /** Username of the user */
  username: string;
  /** Email of the user */
  email: string;
}

/** User associated to an organization member */
export interface OrganizationMemberUser {
  /** Unique id (uuid) of the user */
  id: string;
  /** Username of the user */
  username: string;
  /** Email of the user */
  email: string;
  /** Whether the user has two-factor authentication enabled */
  otp_activated: boolean;
  /** Date of the last activity of the user */
  last_seen_at: string;
}

/** User who invited an organization member */
export interface OrganizationMemberInviter {
  /** Unique id (uuid) of the user */
  id: string;
  /** Username of the user */
  username: string;
  /** Email of the user */
  email: string;
}

/** Member of an organization */
export interface OrganizationMember {
  /** Unique member ID (uuid) */
  id: string;
  /** Role of the member in the organization */
  role: OrganizationMemberRole;
  /** Date the member joined the organization */
  created_at: string;
  /** User associated to the member */
  user: OrganizationMemberUser;
  /** User who invited the member */
  invited_by: OrganizationMemberInviter;
}

/** Invitation to join an organization */
export interface OrganizationInvitation {
  /** Unique invitation ID (uuid) */
  id: string;
  /** Email address the invitation was sent to */
  invited_email: string;
  /** Email of the user who sent the invitation */
  inviter_email: string;
  /** Username of the user who sent the invitation */
  inviter_username: string;
  /** Link the invitee has to follow to accept the invitation */
  invitation_link: string;
  /** Date the invitation was sent */
  created_at: string;
  /** Date after which the invitation can no longer be accepted */
  expiration_date: string;
  /** Whether the invitation has expired */
  expired: boolean;
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

/** A single audited change value */
export type OrganizationEventChangeValue =
  string | number | boolean | null | OrganizationEventActor;

/** A `{ from, to }` diff, as returned for `*.update` events. */
export interface OrganizationEventChangeDiff {
  from: OrganizationEventChangeValue;
  to: OrganizationEventChangeValue;
}

export type OrganizationEventChange =
  OrganizationEventChangeValue | OrganizationEventChangeDiff;

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
  changes: Record<string, OrganizationEventChange>;
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

/** Pagination information returned by the authentication API */
export interface OrganizationPaginationMeta {
  /** Pagination details */
  pagination: PaginationMeta;
}

/** Paginated list of organization members */
export interface PaginatedOrganizationMembers {
  /** Members of the requested page */
  members: OrganizationMember[];
  /** Meta information */
  meta: OrganizationPaginationMeta;
}

/** Meta information of a paginated list of organization invitations */
export interface OrganizationInvitationsMeta extends OrganizationPaginationMeta {
  /** Number of non-expired invitations across all pages */
  pending_count: number;
}

/** Paginated list of organization invitations */
export interface PaginatedOrganizationInvitations {
  /** Invitations of the requested page */
  invitations: OrganizationInvitation[];
  /** Meta information */
  meta: OrganizationInvitationsMeta;
}
