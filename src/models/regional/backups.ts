export type BackupStatus =
  | "scheduled"
  | "running"
  | "done"
  | "error"
  | "cancelling"
  | "cancelled";

/** Database backup */
export interface Backup {
  /** Backup ID */
  id: string;
  /** Database ID this backup belongs to */
  database_id: string;
  /** Backup creation method */
  method: "periodic" | "manual";
  /** Current backup status */
  status: BackupStatus;
  /** Backup name */
  name: string;
  /** Backup size in bytes */
  size: number;
  /** When the backup started */
  started_at: string | null;
  /** When the backup was created */
  created_at: string;
  /** Hidden backups are generally filtered by the API */
  hidden?: boolean;
}
