import axios from "axios";
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
export const defaultClientOptions = {
    apiUrl: "https://api.osc-fr1.scalingo.com",
    authApiUrl: "https://auth.scalingo.com",
    billingApiUrl: "https://cashmachine.scalingo.com",
    noUserAgent: false,
};
export class Client {
    /**
     * Create a new Client for the Scalingo API.
     * @param token Bearer Token for the current user.
     * @param opts Optional configuration
     * @param opts.apiUrl
     * @param opts.authApiUrl=https://auth.scalingo.com] - URL to the Scalingo Authentication API.
     * @param opts.billingApiUrl=https://cashmachine.scalingo.com] - URL to the Scalingo Billing API.
     * @param opts.noUserAgent=false] - Do not set the user agent
     */
    constructor(token, opts = {}) {
        this.Apps = new Apps(this);
        this.Addons = new Addons(this);
        this.Alerts = new Alerts(this);
        this.Autoscalers = new Autoscalers(this);
        this.AuditLogs = new AuditLogs(this);
        this.Billing = new Billing(this);
        this.Collaborators = new Collaborators(this);
        this.Containers = new Containers(this);
        this.Contracts = new Contracts(this);
        this.CronTasks = new CronTasks(this);
        this.DataAccessConsents = new DataAccessConsents(this);
        this.Deployments = new Deployments(this);
        this.Domains = new Domains(this);
        this.Environment = new Environment(this);
        this.Events = new Events(this);
        this.HDSContacts = new HDSContacts(this);
        this.Keys = new Keys(this);
        this.Logs = new Logs(this);
        this.Metrics = new Metrics(this);
        this.Notifiers = new Notifiers(this);
        this.NotificationPlatforms = new NotificationPlatforms(this);
        this.Operations = new Operations(this);
        this.Regions = new Regions(this);
        this.SCMIntegrations = new SCMIntegrations(this);
        this.SCMRepoLinks = new SCMRepoLinks(this);
        this.Stats = new Stats(this);
        this.Tokens = new Tokens(this);
        this.TwoFactorAuth = new TwoFactorAuth(this);
        this.Users = new Users(this);
        const { apiUrl, authApiUrl, billingApiUrl } = opts;
        this._token = token;
        this._apiUrl = apiUrl || defaultClientOptions.apiUrl;
        this._authApiUrl = authApiUrl || defaultClientOptions.authApiUrl;
        this._billingApiUrl = billingApiUrl || defaultClientOptions.billingApiUrl;
        this._headers = {};
        if (opts && !opts.noUserAgent) {
            this._headers["User-Agent"] = `Scalingo Javascript Client`;
        }
    }
    /**
     * Create an axios instance configured for the Scalingo API
     * @return Axios client for the Scalingo API
     */
    apiClient() {
        return axios.create({
            baseURL: `${this._apiUrl}/v1/`,
            headers: Object.assign({}, this._headers, {
                Authorization: `Bearer ${this._token}`,
            }),
        });
    }
    /**
     * Create an axios instance configured for the Scalingo Authentication API
     * @return Axios client for the Scalingo Authentication API
     */
    authApiClient() {
        return axios.create({
            baseURL: `${this._authApiUrl}/v1/`,
            headers: Object.assign({}, this._headers, {
                Authorization: `Bearer ${this._token}`,
            }),
        });
    }
    /**
     * Create an axios instance configured for the Scalingo Billing API
     * @return Axios client for the Scalingo Billing API
     */
    billingApiClient() {
        return axios.create({
            baseURL: `${this._billingApiUrl}/`,
            headers: Object.assign({}, this._headers, {
                Authorization: `Bearer ${this._token}`,
            }),
        });
    }
    /**
     * Create a vanilla axios instance for the Scalingo API
     * @return Axios instance for the Scalingo Billing API, unauthenticated
     */
    unauthenticatedClient() {
        return axios.create({
            baseURL: `${this._apiUrl}/v1/`,
            headers: this._headers,
        });
    }
}
export class EndpointClient {
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client) {
        this._client = client;
    }
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
export async function clientFromToken(token, opts) {
    const client = new Client("", opts);
    const bearerToken = (await client.Tokens.exchange(token));
    client._token = bearerToken;
    return client;
}
//# sourceMappingURL=index.js.map