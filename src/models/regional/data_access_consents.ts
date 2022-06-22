export interface DataAccessConsent {
  /** Unique ID, starts with "au-" */
  id: string;
  /** ID of the application */
  user_id: string;
  /** Username of the person who grants the access */
  app_id: string;
  /** Creation date of the dataAccessConsent */
  created_at: string;
  /** Update date of the dataAccessConsent */
  updated_at: string;
  /** Deadline of the dataAccessConsent */
  end_at: string;
  /** Databases access granted */
  databases: boolean;
  /** Containers access granted */
  containers: boolean;
}
