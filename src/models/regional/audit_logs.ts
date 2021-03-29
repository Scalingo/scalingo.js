/** @see https://developers.scalingo.com/audit_logs */
export interface AuditLog {
  time: string;
  content: string;
  type: string;
}
