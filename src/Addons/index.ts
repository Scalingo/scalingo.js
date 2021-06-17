import { unpackData } from "../utils";
import { Client } from "..";

import {
  Addon,
  Category,
  AddonProvider,
  AddonSso,
  AddonUpgradeResponse,
  AddonResumeResponse,
} from "../models/regional/addons";
import { CreateParams, UpdateParams } from "../params/regional/addons";

/**
 * Addons API Client
 */
export default class Addons {
  /** Scalingo API Client */
  _client: Client;

  /**
   * Create a new "thematic" client
   * @param client Scalingo API Client
   */
  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Get list of addons of an application
   * @see https://developers.scalingo.com/addons#list-application-addons
   * @param appId ID of the app to get the addons from
   */
  for(appId: string): Promise<Addon[]> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/addons`),
      "addons"
    );
  }

  /**
   * Add an addon to an application
   * @see https://developers.scalingo.com/addons#provision-an-addon
   * @param appId ID of the app
   */
  create(appId: string, payload: CreateParams): Promise<Addon> {
    return unpackData(
      this._client.apiClient().post(`/apps/${appId}/addons`, {
        addon: payload,
      }),
      "addon"
    );
  }

  /**
   * List addon categories
   * @see https://developers.scalingo.com/addon_providers#list-addon-categories
   */
  listCategories(): Promise<Category[]> {
    return unpackData(
      this._client.unauthenticatedClient().get("/addon_categories"),
      "addon_categories"
    );
  }

  /**
   * List addon providers
   * @see https://developers.scalingo.com/addon_providers#list-addon-providers
   * @param categoryId ID of the addon category
   */
  listProviders(
    categoryId?: string,
    authenticated = false
  ): Promise<AddonProvider[]> {
    const url = categoryId
      ? `/addon_providers?category_id=${categoryId}`
      : "/addon_providers";

    const client = authenticated
      ? this._client.apiClient()
      : this._client.unauthenticatedClient();

    return unpackData(client.get(url), "addon_providers");
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
    addon: UpdateParams
  ): Promise<AddonUpgradeResponse> {
    return unpackData(
      this._client
        .apiClient()
        .patch(`/apps/${appId}/addons/${addonId}`, { addon: addon }),
      "addon"
    );
  }

  /**
   * Resume an addon
   * @param appId ID of the current application
   * @param addonId ID of the current addon
   */
  resume(appId: string, addonId: string): Promise<AddonResumeResponse> {
    return unpackData(
      this._client.apiClient().post(`/apps/${appId}/addons/${addonId}/resume`)
    );
  }

  /**
   * Remove an addon
   * @see https://developers.scalingo.com/addons#remove-an-addon
   * @param appId ID of the current application
   * @param addonId ID of the addon
   */
  destroy(appId: string, addonId: string): Promise<void> {
    return unpackData(
      this._client.apiClient().delete(`/apps/${appId}/addons/${addonId}`)
    );
  }

  /**
   * Get the sso of an addon
   * @param appId The ID of the current application
   * @param addonId The ID of the addon
   */
  sso(appId: string, addonId: string): Promise<AddonSso> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/addons/${addonId}/sso`),
      "addon"
    );
  }

  /**
   * Get a specific addon
   * @param appId The ID of the current application
   * @param addonId The ID of the addon to get
   */
  getAddon(appId: string, addonId: string): Promise<Addon> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/addons/${addonId}`),
      "addon"
    );
  }
}
