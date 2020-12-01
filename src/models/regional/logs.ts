/** @see https://developers.scalingo.com/apps#access-to-the-application-logs-archives */
export interface Archive {
  /** Pre-signed URL to download logs archives */
  url: string;
  /** Size of the logs archive */
  size: number;
  /** Date of the first log line present in the archive */
  from: string;
  /** Date of the last log line present in the archive */
  to: string;
}

export interface ArchivesResult {
  archives: Archive[];
  next_cursor: string;
  has_more: boolean;
}
