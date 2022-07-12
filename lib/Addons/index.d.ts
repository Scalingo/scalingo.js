import { Client } from "..";
import { Addon, Category, AddonProvider, AddonSso, AddonUpgradeResponse, AddonResumeResponse } from "../models/regional/addons";
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
    constructor(client: Client);
    /**
     * Get list of addons of an application
     * @see https://developers.scalingo.com/addons#list-application-addons
     * @param appId ID of the app to get the addons from
     */
    for(appId: string): Promise<Addon[]>;
    /**
     * Add an addon to an application
     * @see https://developers.scalingo.com/addons#provision-an-addon
     * @param appId ID of the app
     */
    create(appId: string, payload: CreateParams): Promise<Addon>;
    /**
     * List addon categories
     * @see https://developers.scalingo.com/addon_providers#list-addon-categories
     */
    listCategories(): Promise<Category[]>;
    /**
     * List addon providers
     * @see https://developers.scalingo.com/addon_providers#list-addon-providers
     * @param categoryId ID of the addon category
     */
    listProviders(categoryId?: string, authenticated?: boolean): Promise<AddonProvider[]>;
    /**
     * Upgrade an addon
     * @see https://developers.scalingo.com/addons#upgrade-an-addon
     * @param appId ID of the current application
     * @param addon Contain the ID of the plan of your choice
     * @param addonId ID of the current addon
     */
    update(appId: string, addonId: string, addon: UpdateParams): Promise<AddonUpgradeResponse>;
    /**
     * Resume an addon
     * @param appId ID of the current application
     * @param addonId ID of the current addon
     */
    resume(appId: string, addonId: string): Promise<AddonResumeResponse>;
    /**
     * Remove an addon
     * @see https://developers.scalingo.com/addons#remove-an-addon
     * @param appId ID of the current application
     * @param addonId ID of the addon
     */
    destroy(appId: string, addonId: string): Promise<void>;
    /**
     * Get the sso of an addon
     * @param appId The ID of the current application
     * @param addonId The ID of the addon
     */
    sso(appId: string, addonId: string): Promise<AddonSso>;
    /**
     * Get a specific addon
     * @param appId The ID of the current application
     * @param addonId The ID of the addon to get
     */
    getAddon(appId: string, addonId: string): Promise<Addon>;
}
//# sourceMappingURL=index.d.ts.map