export interface CreateParams {
  /** Name of the project */
  name: string;
  /** Project by default ? */
  default?: boolean;
  /** ID of the organization owning the project, omit for personal projects */
  organization_id?: string | null;
}

export interface UpdateParams {
  /** Name of the project */
  name?: string;
  /** Project by default ? */
  default?: boolean;
  /** ID of the organization owning the project, null to dissociate it */
  organization_id?: string | null;
}
