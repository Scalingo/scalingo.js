import {unpackData} from '../utils.js'

/**
 * Addons API Client
 */
export default class Addons {
  /**
   * Create a new Client for the Containers API
   * @param {Client} client - Scalingo API Client
   */
  constructor(client) {
    this._client = client;
  }
  
  /**
   * Get list of addons of an application
   * @see http://developers.scalingo.com/addons#list-application-addons
   * @param {String} appId ID of the app to get the formation from
   * @return {Promise<Addon[] | APIError>}
   */
  for(appId) {
    return unpackData(this._client.apiClient().get(`/apps/${appId}/addons`), "addons")
  }
  
  /**
   * Add an addon to an application
   * @see http://developers.scalingo.com/addons#provision-an-addon
   * @param {String} appId ID of the app
   * @param {String} planId ID of the plan
   * @param {String} addonProviderId ID of the addon provider
   * @return {Promise<Addon | APIError>}
   */
  create(appId, planId, addonProviderId) {
    return unpackData(this._client.apiClient().post(`/apps/${appId}/addons`,
      {addon: {plan_id: planId, addon_provider_id: addonProviderId}}), "addon")
  }
  
  /**
   * List addon categories
   * @see http://developers.scalingo.com/addon_providers#list-addon-categories
   * @return {Promise<Category[] | APIError>}
   */
  listCategories() {
    return unpackData(this._client.apiClient().get('/addon_categories'), "addon_categories")
  }
  
  /**
   * List addon providers
   * @see http://developers.scalingo.com/addon_providers#list-addon-providers
   * @param {String} categoryId ID of the addon category
   * @return {Promise<AddonProvider[] | APIError>}
   */
  listProviders(categoryId) {
    return unpackData(this._client.unauthenticatedClient().get(`/addon_providers?category_id=${categoryId}`), "addon_providers")
  }
  
  /**
   * Upgrade an addon
   * @see http://developers.scalingo.com/addons#upgrade-an-addon
   * @param {String} appId ID of the current application
   * @param {Object} addon Contain the ID of the plan of your choice
   * @param {String} addonId ID of the current addon
   * @return {Promise<AddonUpgrade | APIError>}
   */
  update(appId, addonId, addon) {
    return unpackData(this._client.apiClient().patch(`/apps/${appId}/addons/${addonId}`, {addon: addon}), "addon")
  }
  
  /**
   * Remove an addon
   * @see http://developers.scalingo.com/addons#remove-an-addon
   * @param {String} appId ID of the current application
   * @param {String} addonId ID of the addon
   * @return {Promise<? | APIError>}
   */
  destroy(appId, addonId) {
    return unpackData(this._client.apiClient().delete(`/apps/${appId}/addons/${addonId}`))
  }
  
}

/**
 * @typedef {Object} Addon
 * @property {String} id Unique ID identifying the addon
 * @property {Date} provisioned_at When the addon has been created
 * @property {Date} deprovisioned_at When the addon has been deleted/upgraded
 * @property {String} resource_id Resource reference
 * @property {Plan} plan Embedded reference to Plan resource
 * @property {AddonProvider} addon_provider Embedded reference to AddonProvider resource
 */

/**
 * @typedef {Object} Plan
 * @property {String} id Unique ID of the plan
 * @property {String} name Name of the plan (internal reference)
 * @property {String} display_name User friendly name
 * @property {number<float>} price The price of the plan in euros
 * @property {String} description Description of the plan
 */

/**
 * @typedef {Object} AddonProvider
 * @property {String} id Unique ID of the addon provider
 * @property {String} name Name of the addon provider
 * @property {String} logo_url The url of the logo
 * @property {String} short_description Short description of the addon provider
 * @property {String} description Complete description of the addon provider
 * @property {Category} category Embedded category object
 * @property {String} provider_name Name of the company offering this addon
 * @property {String} provider_url URL of the company offering this addon
 * @property {Plan[]} plans Embedded array of plans for this addon
 */

/**
 * @typedef {Object} Category
 * @property {String} id ID of the category
 * @property {String} description Description of the category
 * @property {String} name Name of the category
 */

/**
 * @typedef {Object} AddonUpgrade
 * @property {String[]} vars Array of variables
 * @property {String} message Custom message from the addon provider
 */
