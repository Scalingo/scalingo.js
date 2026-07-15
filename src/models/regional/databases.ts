import { Archive } from "./logs";

export interface DatabaseOwner {
  id: string;
  email: string;
  username: string;
  flags?: Record<string, boolean>;
}

export interface DatabaseProject {
  name?: string;
  id?: string;
}

export interface DashboardDatabase {
  app: DatabaseAppDashboard;
  addon: DatabaseAddon;
  database: DatabaseObject;
}

export interface Database {
  app: DatabaseApp;
  addon: DatabaseAddon;
  database: DatabaseObject;
}

export interface DatabaseAppDashboard {
  id: string;
  uuid: string;
  name: string;
  parent_app_id?: string;
  region: string;
  status: string;
  created_at: string;
  last_deployed_at?: string;
  hds_resource?: boolean;
  project: DatabaseProject;
  owner: DatabaseOwner;
  addon_updated_at?: string;
  dedicated_database?: boolean;
  addon?: DatabaseAddon;
  database?: DatabaseObject;
}
export interface DatabaseApp {
  id: string;
  uuid: string;
  name: string;
  parent_app_name: string;
  git_url: string;
  url: string;
  created_at: string;
  updated_at: string;
  status: string;
  owner: DatabaseOwner;
  last_deployed_at?: string;
  last_deployed_by?: string;
  links: DatabaseLinks;
  git_source?: string;
  flags?: Record<string, boolean>;
  limits?: Record<string, unknown>;
  last_deployment_id?: string;
  force_https?: boolean;
  sticky_session?: boolean;
  router_logs?: boolean;
  stack_id?: string;
  base_url?: string;
  new_dashboard_url?: string;
  new_region?: string;
  region: string;
  hds_resource?: boolean;
  c3_resource?: boolean;
  project?: DatabaseProject;
  data_access_consent?: unknown;
}

export interface DatabaseLinks {
  deployments_stream: string;
}

export interface DatabaseAddon {
  id: string;
  app_id: string;
  resource_id: string;
  addon_provider: DatabaseAddonProvider;
  plan: DatabaseAddonPlan;
  provisioned_at?: string;
  deprovisioned_at?: string;
  status: string;
  hds_resource?: boolean;
}

export interface DatabaseObject {
  id: string;
  name: string;
  project_id: string;
  technology: string;
  plan: string;
}

export interface DatabaseAddonProvider {
  id: string;
  name: string;
  logo_url: string;
}

export interface DatabaseAddonPlan {
  id: string;
  name: string;
  display_name: string;
  price: number;
  description: string;
  hds_available: boolean;
}

export interface DatabasePostProvisioningConfigurationParams {
  /** Allow access from Scalingo applications in the current database region */
  regional_network_access?: boolean;
  /** Application IDs that should receive the database connection environment variable */
  app_ids?: string[];
}

export interface CreateParams {
  /** Technology ID or slug of the addon provider */
  technology?: string;
  /** Plan ID or name */
  plan?: string;
  /** Name of the database */
  name: string;
  /** ID of the project (optional) */
  project_id?: string;
  /** HDS mode for the dedicated database */
  hds_resource?: boolean;
  /** Optional post-provisioning actions (regional access + env var injection targets) */
  post_provisioning_configuration?: DatabasePostProvisioningConfigurationParams;
}

/** Parameters accepted when updating a database via the dbaas API */
export interface DatabaseUpdateParams {
  /** Whether periodic backups are enabled */
  periodic_backups_enabled?: boolean;
  /** Scheduled hours for periodic backups */
  periodic_backups_scheduled_at?: number[];
  /** Maintenance window configuration */
  maintenance_window?: {
    /** Day of the week in UTC (0-6, where 0 is Sunday) */
    weekday_utc: number;
    /** Starting hour in UTC (0-23) */
    starting_hour_utc: number;
  };
}

/** Known database feature names */
export type DbFeatureName =
  | "force-ssl"
  | "publicly-available"
  | "redis-rdb"
  | "redis-aof"
  | "redis-cache";

/** Database feature status */
export type FeatureStatus =
  | "PENDING"
  | "ACTIVATED"
  | "FAILED"
  | "PENDING_TO_ACTIVATE"
  | "PENDING_TO_REMOVE";

/** Database feature */
export interface DatabaseFeature {
  /** Feature name (e.g., 'force-ssl', 'publicly-available') */
  name: DbFeatureName | string;
  /** Feature status */
  status: FeatureStatus | string;
}

/** PostgreSQL specific configuration */
export interface PostgreSQLConfig {
  /** Whether TimescaleDB extension is enabled */
  timescaledb_enabled: boolean;
}

/** Database instance information */
export interface DatabaseInstance {
  /** Instance ID */
  id: string;
  /** Instance hostname */
  hostname: string;
  /** Instance port */
  port: number;
  /** Instance status */
  status: string;
  /** Instance type (e.g., 'gateway', 'db-node') */
  type: string;
  /** Instance private IP */
  private_ip: string;
  /** Instance features */
  features?: string[];
}

/** Database maintenance window configuration */
export interface MaintenanceWindow {
  /** Day of the week in UTC (0-6, where 0 is Sunday) */
  weekday_utc: number;
  /** Starting hour in UTC (0-23) */
  starting_hour_utc: number;
  /** Duration in hours */
  duration_in_hour: number;
}

/** Response payload for PITR restore */
export interface DatabasePitrRestoreResponse {
  operation: DbOperation;
}

/** Database type information */
export interface DatabaseType {
  /** Database type ID */
  id: string;
  /** Database type name (e.g., 'postgresql', 'mysql', 'mongodb') */
  name: string;
  /** Logo URL for the database type */
  logo_url: string;
  /** Short description */
  short_description: string;
  /** Full description */
  description: string;
  /** Creation timestamp */
  created_at: string;
  /** Last update timestamp */
  updated_at: string;
}

/** Database type version information */
export interface DatabaseTypeVersion {
  /** Version ID */
  id: string;
  /** Creation timestamp */
  created_at: string;
  /** Last update timestamp */
  updated_at: string;
  /** Major version number */
  major: number;
  /** Minor version number */
  minor: number;
  /** Patch version number */
  patch: number;
  /** Build number */
  build: number;
  /** Database type ID this version belongs to */
  database_type_id: string;
  /** Enabled features (e.g., 'tls') */
  features: string[];
  /** Next available upgrade version ID */
  next_upgrade: string | null;
  /** Allowed plugins for this version */
  allowed_plugins: string[] | null;
}

export interface FirewallRule {
  id: string;
  type: string;
  cidr?: string;
  range_id?: string;
  label?: string;
  created_at?: string;
  updated_at?: string;
}

export interface FirewallManagedRange {
  id: string;
  name: string;
}

export interface FirewallRuleCreateParams {
  type: string;
  cidr?: string;
  range_id?: string;
  label?: string;
}

export interface FirewallRuleUpdateParams {
  label?: string;
}

/** Detailed database information from dbaas API */
export interface ApiDatabase {
  /** Database ID */
  id: string;
  /** Resource ID */
  resource_id: string;
  /** Associated app name */
  app_name: string;
  /** Creation timestamp */
  created_at: string;
  /** Whether encryption at rest is enabled */
  encryption_at_rest: boolean;
  /** Database features */
  features: DatabaseFeature[];
  /** Database plan */
  plan: string;
  /** Database status */
  status: string;
  /** Database type ID */
  type_id: string;
  /** Database type name (e.g., 'postgresql', 'mysql', 'mongodb') */
  type_name: string;
  /** Current version ID */
  version_id: string;
  /** MongoDB replica set name (empty for non-MongoDB databases) */
  mongo_repl_set_name: string;
  /** Human-readable version string */
  readable_version: string;
  /** Database hostname */
  hostname: string;
  /** Database instances */
  instances: DatabaseInstance[];
  /** Next available version ID for upgrade */
  next_version_id: string | null;
  /** Current operation ID (null if no operation in progress) */
  current_operation_id: string | null;
  /** Whether the database is a cluster */
  cluster: boolean;
  /** Whether periodic backups are enabled */
  periodic_backups_enabled: boolean;
  /** Scheduled hours for periodic backups */
  periodic_backups_scheduled_at: number[];
  /** Timestamp of first PITR backup */
  first_pitr_backup: string | null;
  /** Database flags */
  flags: string[];
  /** Maintenance window configuration */
  maintenance_window: MaintenanceWindow;
  /** PostgreSQL specific configuration (only present for PostgreSQL databases) */
  postgresql_config?: PostgreSQLConfig;
}

/** Database plan information */
export interface DatabasePlan {
  /** Plan ID */
  id: string;
  /** Plan name */
  name: string;
  /** Whether backups are supported */
  backup: boolean;
  /** Disk size in MB */
  disk: number;
  /** Memory size in MB */
  memory: number;
  /** Number of manual backups allowed */
  manual_backups_count?: number;
  /** Number of daily scheduled backups */
  daily_scheduled_backups?: number;
  /** Number of weekly scheduled backups */
  weekly_scheduled_backups?: number;
  /** Number of monthly scheduled backups */
  monthly_scheduled_backups?: number;
  /** Number of PITR backup days */
  pitr_backup_days?: number;
  /** Number of gateway nodes */
  gateway_nodes?: number;
}

/** Database memory metrics */
export interface DatabaseMemoryMetrics {
  /** Total RAM bytes used */
  memory?: number;
  /** Highest memory usage recorded */
  memory_max?: number;
  /** Max memory allocated */
  memory_limit?: number;
  /** Total SWAP bytes used */
  swap?: number;
  /** Highest swap usage recorded */
  swap_max?: number;
  /** Max SWAP allocated */
  swap_limit?: number;
}

/** Database metrics from db-core */
export interface DatabaseMetrics {
  /** CPU usage percentage */
  cpu_usage?: number;
  /** Memory metrics */
  memory?: DatabaseMemoryMetrics;
  /** Database size in bytes */
  database_size?: number;
  /** Real disk size in bytes */
  real_disk_size?: number;
  /** Database statistics */
  database_stats?: Record<string, unknown>;
  /** Per-instance metrics */
  instances_metrics?: unknown[];
}

/** Database instance status */
export interface DatabaseInstanceStatus {
  /** Instance ID */
  id: string;
  /** Instance type (e.g., 'db-node', 'gateway') */
  type: string;
  /** Instance status (e.g., 'running') */
  status: string;
  /** Instance role (e.g., 'master', 'follower') */
  role?: string;
  /** DBMS-level status */
  dbms_status?: string;
}

/** Logs archives result */
export interface LogsArchivesResult {
  /** Archive entries */
  archives: Archive[];
  /** Next cursor for pagination */
  next_cursor: string;
  /** Whether more results are available */
  has_more: boolean;
}

/** Database operation status */
export type DbOperationStatus =
  | "pending"
  | "running"
  | "finished"
  | "error"
  | "user-error"
  | "cancelling"
  | "cancelled";

/** Statuses that indicate a database operation has reached its final state */
export const DB_OPERATION_FINISHED_STATUSES: DbOperationStatus[] = [
  "finished",
  "error",
  "user-error",
  "cancelled",
];

/** Database operation type */
export type DbOperationType = "pitr_restore" | "upgrade" | string;

/** Operation types that should display a banner to the user */
export const DB_OPERATION_TYPES_WITH_BANNER: DbOperationType[] = [
  "pitr_restore",
  "upgrade",
];

/** Kind of banner associated to a database operation */
export type DbOperationBannerKind =
  "success" | "error" | "user-error" | "warning" | "info";

/** Database operation */
export interface DbOperation {
  id: string;
  type: DbOperationType;
  status: DbOperationStatus;
  created_at: string;
  finished_at: string | null;
  error: string | null;
}

/** Database user */
export interface DatabaseUser {
  name: string;
  read_only: boolean;
  password?: string;
  protected: boolean;
  dbms_attributes?: {
    password_encryption: string;
    anonymizer_enabled?: boolean;
  };
}

/** Params for creating a database user */
export interface DatabaseUserCreateParams {
  database_id: string;
  name: string;
  read_only?: boolean;
  password?: string;
  password_confirmation?: string;
}

/**
 * Check whether a database feature has a given status.
 * @param db The database object (ApiDatabase)
 * @param name The feature name to look up
 * @param status The expected status
 */
export function dbFeatureIs(
  db: Pick<ApiDatabase, "features">,
  name: DbFeatureName | string,
  status: FeatureStatus | string,
): boolean {
  const feature = db.features.find((f) => f.name === name);
  if (!feature) return false;
  return feature.status === status;
}
