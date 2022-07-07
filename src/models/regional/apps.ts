import { HDSContact } from "./hds_contact";

/** Application is new, no code is running */
export const STATUS_NEW = "new";

/** Application is stopped, no containers are active */
export const STATUS_STOPPED = "stopped";

/** Application is running */
export const STATUS_RUNNING = "running";

/** Application has crashed */
export const STATUS_CRASHED = "crashed";

/** Application is restarting */
export const STATUS_RESTARTING = "restarting";

/** Application is changing the container formation */
export const STATUS_SCALING = "scaling";

/** Application is starting up */
export const STATUS_BOOTING = "booting";

export type AppStatus =
  | typeof STATUS_NEW
  | typeof STATUS_STOPPED
  | typeof STATUS_RUNNING
  | typeof STATUS_CRASHED
  | typeof STATUS_RESTARTING
  | typeof STATUS_SCALING
  | typeof STATUS_BOOTING;

export interface AppOwner {
  id: string;
  username: string;
  email: string;
  flags: Record<string, boolean>;
}

/** @see https://developers.scalingo.com/apps */
export interface App {
  /** unique ID */
  id: string;
  /** unique ID (different format) */
  uuid: string;
  /** name of the application, can substitute the ID */
  name: string;
  /** region of the application */
  region: string;
  /** creation date of the application */
  created_at: string;
  /** last time the application has been updated */
  updated_at: string;
  /** last time the application has been updated */
  parent_app_name: string;
  /** URL to the GIT remote to access your application */
  git_url: string;
  /** information about the owner of the application */
  owner: AppOwner;
  /** platform allocated URL to access to your app */
  url: string;
  /** object of related link like deployments_stream */
  links: AppLinks;
  /** App-specific limits */
  limits: Record<string, number>;
  /** App-specific flags */
  flags: Record<string, boolean>;
  /** activation of force HTTPS */
  force_https: boolean;
  /** activation of sticky session */
  sticky_session: boolean;
  /** activation of the router logs in your app logs */
  router_logs: boolean;
  /** date of the last deployment attempt */
  last_deployed_at: string | null;
  /** user who attempted the last deployment */
  last_deployed_by: string | null;
  /** id of the last successful deployment */
  last_deployment_id: string;
  /** current status of the application */
  status: AppStatus;
  /** HDS Contact, only on HDS app */
  hds_contact: HDSContact;
  hds_resource: boolean;
}

export interface AppLinks {
  /** Websocket used to listen for deployment events on this app. */
  deployments_stream: string;
}
