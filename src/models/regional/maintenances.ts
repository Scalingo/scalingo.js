import { PaginationMeta } from "../../meta";

/** Maintenance event for a database */
export interface Maintenance {
  /** Maintenance ID */
  id: string;
  /** Database ID this maintenance belongs to */
  database_id: string;
  /** Maintenance type */
  type:
    | "no-op"
    | "failing"
    | "instance-migration"
    | "pg-md5-to-sha256-auth-migration"
    | "db-upgrade"
    | "plan-update";
  /** Current status */
  status:
    | "scheduled"
    | "queued"
    | "notified"
    | "cancelled"
    | "running"
    | "failed"
    | "done";
  /** When the maintenance started (null if not started) */
  started_at: string | null;
  /** When the maintenance ended (null if not ended) */
  ended_at: string | null;
}

/** Paginated maintenances result from the dbaas API */
export interface MaintenancesResult {
  /** List of maintenances */
  maintenance: Maintenance[];
  /** Pagination metadata */
  meta: PaginationMeta;
}
