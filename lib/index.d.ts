import { AxiosInstance } from "axios";
import Addons from "./Addons";
import Alerts from "./Alerts";
import Apps from "./Apps";
import AuditLogs from "./AuditLogs";
import Autoscalers from "./Autoscalers";
import Billing from "./Billing";
import Collaborators from "./Collaborators";
import Containers from "./Containers";
import Contracts from "./Contracts";
import CronTasks from "./CronTasks";
import DataAccessConsents from "./DataAccessConsents";
import Deployments from "./Deployments";
import Domains from "./Domains";
import Environment from "./Environment";
import Events from "./Events";
import HDSContacts from "./HDSContacts";
import Keys from "./Keys";
import Logs from "./Logs";
import Metrics from "./Metrics";
import NotificationPlatforms from "./NotificationPlatforms";
import Notifiers from "./Notifiers";
import Operations from "./Operations";
import Regions from "./Regions";
import SCMIntegrations from "./SCMIntegrations";
import SCMRepoLinks from "./SCMRepoLinks";
import Stats from "./Stats";
import Tokens from "./Tokens";
import TwoFactorAuth from "./TwoFactorAuth";
import Users from "./Users";
export interface ScalingoClientOptions {
    apiUrl?: string;
    authApiUrl?: string;
    billingApiUrl?: string;
    noUserAgent?: boolean;
}
export declare const defaultClientOptions: Required<ScalingoClientOptions>;
export declare class Client {
    /** Bearer Token for the current user. */
    _token: string;
    /** URL to the main Scalingo API. */
    _apiUrl: string;
    /** URL to the Scalingo Authentication API. */
    _authApiUrl: string;
    /** URL to the Scalingo Billing API. */
    _billingApiUrl: string;
    /** Global HTTP headers */
    _headers: Record<string, string | number | boolean>;
    /**
     * Create a new Client for the Scalingo API.
     * @param token Bearer Token for the current user.
     * @param opts Optional configuration
     * @param opts.apiUrl
     * @param opts.authApiUrl=https://auth.scalingo.com] - URL to the Scalingo Authentication API.
     * @param opts.billingApiUrl=https://cashmachine.scalingo.com] - URL to the Scalingo Billing API.
     * @param opts.noUserAgent=false] - Do not set the user agent
     */
    constructor(token: string, opts?: ScalingoClientOptions);
    Apps: Apps;
    Addons: Addons;
    Alerts: Alerts;
    Autoscalers: Autoscalers;
    AuditLogs: AuditLogs;
    Billing: Billing;
    Collaborators: Collaborators;
    Containers: Containers;
    Contracts: Contracts;
    CronTasks: CronTasks;
    DataAccessConsents: DataAccessConsents;
    Deployments: Deployments;
    Domains: Domains;
    Environment: Environment;
    Events: Events;
    HDSContacts: HDSContacts;
    Keys: Keys;
    Logs: Logs;
    Metrics: Metrics;
    Notifiers: Notifiers;
    NotificationPlatforms: NotificationPlatforms;
    Operations: Operations;
    Regions: Regions;
    SCMIntegrations: SCMIntegrations;
    SCMRepoLinks: SCMRepoLinks;
    Stats: Stats;
    Tokens: Tokens;
    TwoFactorAuth: TwoFactorAuth;
    Users: Users;
    /**
     * Create an axios instance configured for the Scalingo API
     * @return Axios client for the Scalingo API
     */
    apiClient(): AxiosInstance;
    /**
     * Create an axios instance configured for the Scalingo Authentication API
     * @return Axios client for the Scalingo Authentication API
     */
    authApiClient(): AxiosInstance;
    /**
     * Create an axios instance configured for the Scalingo Billing API
     * @return Axios client for the Scalingo Billing API
     */
    billingApiClient(): AxiosInstance;
    /**
     * Create a vanilla axios instance for the Scalingo API
     * @return Axios instance for the Scalingo Billing API, unauthenticated
     */
    unauthenticatedClient(): AxiosInstance;
}
export declare class EndpointClient {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
}
export default Client;
/**
 * Return a client from a user token.
 * It exchange the token and then return a new client.
 * @param token Bearer Token for the current user.
 * @param opts Optional configuration
 * @param opts.apiUrl
 * @param opts.authApiUrl=https://auth.scalingo.com] - URL to the Scalingo Authentication API.
 * @param opts.billingApiUrl=https://cashmachine.scalingo.com] - URL to the Scalingo Billing API.
 * @param opts.noUserAgent=false] - Do not set the user agent
 */
export declare function clientFromToken(token: string, opts: ScalingoClientOptions): Promise<Client>;
//# sourceMappingURL=index.d.ts.map