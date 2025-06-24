export interface CreateParams {
  /** Name of the project */
  name: string;
  /** Project by default ? */
  default?: boolean;
}

export interface UpdateParams {
  /** Name of the project */
  name?: string;
  /** Project by default ? */
  default?: boolean;
}
