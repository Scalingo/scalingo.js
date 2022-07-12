import { Client } from "..";
import { Autoscaler } from "../models/regional/autoscalers";
import { CreateParams, UpdateParams } from "../params/regional/autoscalers";
/**
 * Autoscalers API Client
 */
export default class Autoscalers {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * List all the autoscalers of an application
     * @see https://developers.scalingo.com/autoscalers#list-autoscalers-of-an-app
     * @param appId ID of the app to get autoscalers list
     */
    for(appId: string): Promise<Autoscaler[]>;
    /**
     * Create an autoscaler the the application
     * @see https://developers.scalingo.com/autoscalers#create-a-new-autoscaler
     * @param appId ID of the app
     * @param autoscaler The configuration of the autoscaler
     */
    create(appId: string, autoscaler: CreateParams): Promise<Autoscaler>;
    /**
     * Delete a autoscaler from a specific application
     * @see https://developers.scalingo.com/autoscalers#delete-an-autoscaler
     * @param appId ID of the app to post to the specified application
     * @param autoscalerId ID of the specified autoscaler
     */
    destroy(appId: string, autoscalerId: string): Promise<void>;
    /**
     * Show a specific autoscaler from an application
     * @see https://developers.scalingo.com/autoscalers#get-an-autoscaler
     * @param appId ID of the app to post to the specified application
     * @param autoscalerId ID of the autoscaler
     */
    show(appId: string, autoscalerId: string): Promise<Autoscaler>;
    /**
     * Update an autoscaler from a specific application
     * @see https://developers.scalingo.com/autoscalers#update-an-autoscaler
     * @param appId ID of the app
     * @param autoscalerId ID of the autoscaler to update
     * @param autoscaler An object of the autoscaler to update
     */
    update(appId: string, autoscalerId: string, autoscaler: UpdateParams): Promise<Autoscaler>;
}
//# sourceMappingURL=index.d.ts.map