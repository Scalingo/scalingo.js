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
  app: DatabaseAppDashboard;
  addon: DatabaseAddon;
}

export interface Database {
  app: DatabaseApp;
  addon: DatabaseAddon;
}

export interface DatabaseAppDashboard {
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
  addon?: DatabaseAddon;
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

export interface CreateParams {
  /** ID of the addon provider */
  addon_provider_id: string;
  /** ID of the plan */
  plan_id: string;
  /** Name of the database */
  database_name: string;
  /** ID of the project (optional) */
  project_id?: string;
}

export type FirewallRuleType = "custom_range" | "managed_range";

export interface FirewallRule {
  id: string;
  type: FirewallRuleType;
  label?: string;
  cidr?: string;
  range_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateFirewallRuleParams {
  type: FirewallRuleType;
  label?: string;
  cidr?: string;
  range_id?: string;
}

export interface UpdateFirewallRuleParams {
  label: string;
}

export interface ManagedRange {
  id: string;
  name: string;
}
