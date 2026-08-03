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
