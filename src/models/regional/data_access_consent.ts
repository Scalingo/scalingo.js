export interface DataAccessConsent {
  /** UUID of the related application */
  app_id: string;
  /** UUID of the person who granted the access */
  user_id: string;
  /** Databases access granted until */
  databases_until: string | null;
  /** Containers access granted until */
  containers_until: string | null;
}
