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
  /** Temporary download token (128 hex chars, 5-minute expiry) */
  download_token?: string;
  /** When the download token was generated (ISO8601) */
  download_token_date?: string;
}

export type BackupRestorationStatus =
  | "scheduled"
  | "running"
  | "done"
  | "error";

export interface BackupRestoration {
  id: string;
  created_at: string;
  started_at: string | null;
  ended_at: string | null;
  method: "backup" | "remote";
  status: BackupRestorationStatus;
  database_id: string;
  source_backup_id: string;
}
