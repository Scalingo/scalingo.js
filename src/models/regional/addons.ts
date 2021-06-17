export interface Addon {
  /** Unique ID identifying the addon */
  id: string;
  /** Unique ID identifying the addon's app */
  app_id: string;
  /** Resource reference */
  resource_id: string;
  /** When the addon has been created */
  provisioned_at: string;
  /** When the addon has been deleted/upgraded */
  deprovisioned_at: string;
  /** Embedded reference to Plan resource */
  plan: Plan;
  /** Embedded reference to AddonProvider resource */
  addon_provider: AddonProvider;
  /** Current status of the addon */
  status: "running" | "provisioning" | "suspended";
}

export interface AddonUpgradeResponse {
  /** Array of variables */
  vars: string[];
  /** Custom message from the addon provider */
  message: string;
}

export interface AddonResumeResponse {
  addon: Addon;
  /** Custom message from the addon provider */
  message: string;
}

export interface Plan {
  /** Unique ID of the plan */
  id: string;
  /** Name of the plan (internal reference) */
  name: string;
  /** User friendly name */
  display_name: string;
  /** The price of the plan in euros */
  price: number;
  /** Description of the plan */
  description: string;
}

export interface AddonProvider {
  /** Unique ID of the addon provider */
  id: string;
  /** Name of the addon provider */
  name: string;
  /** The url of the logo */
  logo_url: string;
  /** Short description of the addon provider */
  short_description: string;
  /** Complete description of the addon provider */
  description: string;
  /** Embedded category object */
  category: Category;
  /** Name of the company offering this addon */
  provider_name: string;
  /** URL of the company offering this addon */
  provider_url: string;
  /** Embedded array of plans for this addon */
  plans: Plan[];
}

export interface Category {
  /** ID of the category */
  id: string;
  /** Description of the category */
  description: string;
  /** Name of the category */
  name: string;
}

export interface AddonSso {
  /** The id of the addon */
  id: string;
  /** The id of the current App */
  appId: string;
  /** The id of the resource */
  resourceId: string;
  /** Embedded reference to Plan resource */
  plan: Plan;
  /** Embedded reference to AddonProvider resource */
  addon_provider: AddonProvider;
  /** When the addon has been created */
  provisioned_at: string;
  /** When the addon has been deleted/upgraded */
  deprovisioned_at: string;
  /** The current status of the addon */
  status: string;
  /** The sso url of the addon */
  ssoUrl: string;
}
