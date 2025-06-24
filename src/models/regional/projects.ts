export interface ProjectOwner {
  id: string;
  username: string;
  email: string;
  flags: Record<string, boolean>;
}

export interface Project {
  /** unique ID */
  id: string;
  /** name of the project */
  name: string;
  /** is this the default project? */
  default: boolean;
  /** creation date of the project */
  created_at: string;
  /** last update date of the project */
  updated_at: string;
  /** information about the owner of the project */
  owner: ProjectOwner;
}
