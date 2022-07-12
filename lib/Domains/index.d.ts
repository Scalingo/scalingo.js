import { Client } from "..";
import { Domain } from "../models/regional/domains";
import { CreateParams, UpdateParams } from "../params/regional/domains";
/**
 * Domains API Client
 */
export default class Domains {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * List all the domains of an application
     * @see https://developers.scalingo.com/domains#list-all-the-domains-of-an-application
     * @param appId ID of the app to get domains list
     */
    for(appId: string): Promise<Domain[]>;
    /**
     * Link a domain name to a specific application
     * @see https://developers.scalingo.com/domains#link-a-domain-name-to-an-application
     * @param appId ID of the app to post to the specified application
     * @param domain An object of the domain to link
     */
    create(appId: string, domain: CreateParams): Promise<Domain>;
    /**
     * Delete a domain from a specific application
     * @see https://developers.scalingo.com/domains#unlink-a-domain-name-from-an-application
     * @param appId ID of the app to post to the specified application
     * @param domainId ID of the specified domain
     */
    destroy(appId: string, domainId: string): Promise<void>;
    /**
     * Show a specific domain from an application
     * @see https://developers.scalingo.com/domains#show-a-specific-domain-of-an-application
     * @param appId ID of the app to post to the specified application
     * @param domainId ID of the domain name
     */
    show(appId: string, domainId: string): Promise<Domain>;
    /**
     * Update a domain from a specific application
     * @see https://developers.scalingo.com/domains#update-a-domain-name
     * @param appId ID of the app to post to the specified application
     * @param domainId ID of the domain to update
     * @param domain An object of the domain to update
     */
    update(appId: string, domainId: string, domain: UpdateParams): Promise<Domain>;
}
//# sourceMappingURL=index.d.ts.map