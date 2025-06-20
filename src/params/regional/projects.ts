export interface CreateProjectParams {
  /** Name of the project */
  name: string;
  /** Project by default ? */
  default?: boolean;
}

export interface UpdateProjectParams {
  /** Name of the project */
  name?: string;
  /** Project by default ? */
  default?: boolean;
}
