import { Client } from "..";
import { Variable } from "../models/regional/environment";
import { CreateParams, UpdateParams, BulkUpdateParams } from "../params/regional/environment";
/**
 * Environment API Client
 */
export default class Environment {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * List all the environment variables of an application
     * @see https://developers.scalingo.com/environment#list-environment-variables-of-an-app
     * @param appId ID of the app to get domains list
     */
    for(appId: string): Promise<Variable[]>;
    /**
     * Create an environment variable for an application
     * @see https://developers.scalingo.com/environment#add-environment-variables-to-an-app
     * @param appId ID of the app to get domains list
     * @param variable An Object that contain the information about the environment variable
     */
    create(appId: string, variable: CreateParams): Promise<Variable>;
    /**
     * Create or update multiple environment variables for an application
     * @see https://developers.scalingo.com/environment#bulk-update-of-the-environment-of-an-app
     * @param appId ID of the app to get domains list
     * @param variablesArray An array of Object that contain the information about the environment variables to update
     */
    bulkUpdate(appId: string, variablesArray: BulkUpdateParams): Promise<Variable[]>;
    /**
     * Update an environment variable
     * @see https://developers.scalingo.com/environment#update-an-environment-variable
     * @param appId ID of the app to get domains list
     * @param id ID of the variable to update
     * @param value An string of the value of the environment variable to update
     */
    update(appId: string, id: string, value: UpdateParams): Promise<Variable>;
    /**
     * Delete an environment variable
     * @see https://developers.scalingo.com/environment#delete-an-environment-variable
     * @param appId ID of the app to get domains list
     * @param variableId ID of the variable to delete
     */
    destroy(appId: string, variableId: string): Promise<void>;
    /**
     * Delete multiple environment variables
     * @see https://developers.scalingo.com/environment#bulk-delete-environment-variables-of-an-app
     * @param appId ID of the app
     * @param variablesArray An array of variables id
     */
    bulkDestroy(appId: string, variablesArray: string[]): Promise<string[]>;
}
//# sourceMappingURL=index.d.ts.map