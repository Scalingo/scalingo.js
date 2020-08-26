/** @see https://developers.scalingo.com/keys */
export interface Key {
  /** Unique key ID */
  id: string;
  /** Key name */
  name: string;
  /** Content of the SSH key */
  content: string;
  /** Fingerprint of the SSH key */
  fingerprint: string;
  /** Creation date of the SSH Key */
  created_at: string;
  /** Owner of the SSH key */
  owner: Record<string, any>;
}
