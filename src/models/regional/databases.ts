export interface DatabaseOwner {
  id: string;
  email: string;
  username: string;
  flags?: Record<string, boolean>;
}

export interface DatabaseProject {
  name?: string;
  id?: string;
}

export interface DashboardDatabase {
  id: string;
  uuid: string;
  name: string;
  parent_app_id?: string;
  region: string;
  status: string;
  created_at: string;
  last_deployed_at?: string;
  hds_resource?: boolean;
  project: DatabaseProject;
  owner: DatabaseOwner;
  addon_updated_at?: string;
  dedicated_database?: boolean;
}

export interface Database {
  app: DatabaseApp;
  addon: DatabaseAddon;
}

export interface DatabaseApp {
  id: string;
  uuid: string;
  name: string;
  parent_app_name: string;
  git_url: string;
  url: string;
  created_at: string;
  updated_at: string;
  status: string;
  owner: DatabaseOwner;
  last_deployed_at?: string;
  last_deployed_by?: string;
  links: DatabaseLinks;
  git_source?: string;
  flags?: Record<string, boolean>;
  limits?: Record<string, unknown>;
  last_deployment_id?: string;
  force_https?: boolean;
  sticky_session?: boolean;
  router_logs?: boolean;
  stack_id?: string;
  base_url?: string;
  new_dashboard_url?: string;
  new_region?: string;
  region: string;
  hds_resource?: boolean;
  c3_resource?: boolean;
  project?: DatabaseProject;
  data_access_consent?: unknown;
}

export interface DatabaseLinks {
  deployments_stream: string;
}

export interface DatabaseAddon {
  id: string;
  app_id: string;
  resource_id: string;
  addon_provider: DatabaseAddonProvider;
  plan: DatabaseAddonPlan;
  provisioned_at?: string;
  deprovisioned_at?: string;
  status: string;
  hds_resource?: boolean;
}

export interface DatabaseAddonProvider {
  id: string;
  name: string;
  logo_url: string;
}

export interface DatabaseAddonPlan {
  id: string;
  name: string;
  display_name: string;
  price: number;
  description: string;
  hds_available: boolean;
}
