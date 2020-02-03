import { unpackData } from '../utils'
import { Client, APIResponse } from '..'

export interface AddonSso {
  /** The id of the addon */
  id: string
  /** The id of the current App */
  appId: string
  /** The id of the resource */
  resourceId: string
  /** Embedded reference to Plan resource */
  plan: Plan
  /** Embedded reference to AddonProvider resource */
  addon_provider: AddonProvider
  /** When the addon has been created */
  provisioned_at: string
  /** When the addon has been deleted/upgraded */
  deprovisioned_at: string
  /** The current status of the addon */
  status: string
  /** The sso url of the addon */
  ssoUrl: string
}

export interface Addon {
  /** Unique ID identifying the addon */
  id: string
  /** When the addon has been created */
  provisioned_at: string
  /** When the addon has been deleted/upgraded */
  deprovisioned_at: string
  /** Resource reference */
  resource_id: string
  /** Embedded reference to Plan resource */
  plan: Plan
  /** Embedded reference to AddonProvider resource */
  addon_provider: AddonProvider
}

export interface Plan {
  /** Unique ID of the plan */
  id: string
  /** Name of the plan (internal reference) */
  name: string
  /** User friendly name */
  display_name: string
  /** The price of the plan in euros */
  price: number
  /** Description of the plan */
  description: string
}

export interface AddonProvider {
  /** Unique ID of the addon provider */
  id: string
  /** Name of the addon provider */
  name: string
  /** The url of the logo */
  logo_url: string
  /** Short description of the addon provider */
  short_description: string
  /** Complete description of the addon provider */
  description: string
  /** Embedded category object */
  category: Category
  /** Name of the company offering this addon */
  provider_name: string
  /** URL of the company offering this addon */
  provider_url: string
  /** Embedded array of plans for this addon */
  plans: Plan[]
}

export interface Category {
  /** ID of the category */
  id: string
  /** Description of the category */
  description: string
  /** Name of the category */
  name: string
}

export interface AddonUpgrade {
  /** Array of variables */
  vars: string[]
  /** Custom message from the addon provider */
  message: string
}

export interface AddonUpdateParams {
  plan_id: string
}

/**
 * Addons API Client
 */
export default class Addons {
  /** Scalingo API Client */
  _client: Client

  /**
   * Create a new "thematic" client
   * @param client Scalingo API Client
   */
  constructor(client: Client) {
    this._client = client
  }

  /**
   * Get list of addons of an application
   * @see https://developers.scalingo.com/addons#list-application-addons
   * @param appId ID of the app to get the addons from
   */
  for(appId: string): APIResponse<Addon[]> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/addons`),
      'addons',
    )
  }

  /**
   * Add an addon to an application
   * @see https://developers.scalingo.com/addons#provision-an-addon
   * @param appId ID of the app
   * @param planId ID of the plan
   * @param addonProviderId ID of the addon provider
   */
  create(
    appId: string,
    planId: string,
    addonProviderId: string,
  ): APIResponse<Addon> {
    return unpackData(
      this._client.apiClient().post(`/apps/${appId}/addons`, {
        addon: { plan_id: planId, addon_provider_id: addonProviderId },
      }),
      'addon',
    )
  }

  /**
   * List addon categories
   * @see https://developers.scalingo.com/addon_providers#list-addon-categories
   */
  listCategories(): APIResponse<Category[]> {
    return unpackData(
      this._client.unauthenticatedClient().get('/addon_categories'),
      'addon_categories',
    )
  }

  /**
   * List addon providers
   * @see https://developers.scalingo.com/addon_providers#list-addon-providers
   * @param categoryId ID of the addon category
   */
  listProviders(categoryId?: string): APIResponse<AddonProvider[]> {
    if (categoryId) {
      return unpackData(
        this._client
          .unauthenticatedClient()
          .get(`/addon_providers?category_id=${categoryId}`),
        'addon_providers',
      )
    } else {
      return unpackData(
        this._client.unauthenticatedClient().get(`/addon_providers`),
        'addon_providers',
      )
    }
  }

  /**
   * Upgrade an addon
   * @see https://developers.scalingo.com/addons#upgrade-an-addon
   * @param appId ID of the current application
   * @param addon Contain the ID of the plan of your choice
   * @param addonId ID of the current addon
   */
  update(
    appId: string,
    addonId: string,
    addon: AddonUpdateParams,
  ): APIResponse<AddonUpgrade> {
    return unpackData(
      this._client
        .apiClient()
        .patch(`/apps/${appId}/addons/${addonId}`, { addon: addon }),
      'addon',
    )
  }

  /**
   * Remove an addon
   * @see https://developers.scalingo.com/addons#remove-an-addon
   * @param appId ID of the current application
   * @param addonId ID of the addon
   */
  destroy(appId: string, addonId: string): APIResponse {
    return unpackData(
      this._client.apiClient().delete(`/apps/${appId}/addons/${addonId}`),
    )
  }

  /**
   * Get the sso of an addon
   * @param appId The ID of the current application
   * @param addonId The ID of the addon
   */
  sso(appId: string, addonId: string): APIResponse<AddonSso> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/addons/${addonId}/sso`),
      'addon',
    )
  }

  /**
   * Get a specific addon
   * @param appId The ID of the current application
   * @param addonId The ID of the addon to get
   */
  getAddon(appId: string, addonId: string): APIResponse<Addon> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/addons/${addonId}`),
      'addon',
    )
  }
}
