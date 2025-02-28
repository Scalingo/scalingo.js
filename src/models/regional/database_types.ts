export interface DatabaseType {
  /** Unique ID of the database type */
  id: string;
  /** Name of the database type */
  name: string;
  /** Logo URL for the database type */
  logo_url: string;
  /** ID of the default version for this database type */
  default_version_id: string | null;
  /** Creation timestamp */
  created_at: string;
}

export interface DatabaseTypeVersion {
  /** Unique ID of the database type version */
  id: string;
  /** ID of the parent database type */
  database_type_id: string;
  /** Name of the parent database type */
  database_type_name?: string | null;
  /** Major version number */
  major: number;
  /** Minor version number */
  minor: number | null;
  /** Patch version number */
  patch: number | null;
  /** Build version number */
  build: number | null;
  /** Creation timestamp */
  created_at: string;
  /** Last updated timestamp */
  updated_at: string;
  /** Next upgrade version details */
  next_upgrade?: DatabaseTypeVersion | null;
  /** Features available in this version */
  features: string[];
  /** Allowed plugins for this version */
  allowed_plugins?: string[] | null;
}
