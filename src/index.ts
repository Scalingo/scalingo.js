import axios, { AxiosInstance } from "axios";

import Addons from "./Addons";
import Alerts from "./Alerts";
import Apps from "./Apps";
import AuditLogs from "./AuditLogs";
import Autoscalers from "./Autoscalers";
import Billing from "./Billing";
import Collaborators from "./Collaborators";
import Containers from "./Containers";
import CronTasks from "./CronTasks";
import Deployments from "./Deployments";
import Domains from "./Domains";
import Environment from "./Environment";
import Events from "./Events";
import Keys from "./Keys";
import Logs from "./Logs";
import Metrics from "./Metrics";
import NotificationPlatforms from "./NotificationPlatforms";
import Notifiers from "./Notifiers";
import Operations from "./Operations";
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

export const defaultClientOptions: Required<ScalingoClientOptions> = {
  apiUrl: "https://api.osc-fr1.scalingo.com",
  authApiUrl: "https://auth.scalingo.com",
  billingApiUrl: "https://cashmachine.scalingo.com",
  noUserAgent: false,
};

export class Client {
  /** Bearer Token for the current user. */
  _token: string;

  /** URL to the main Scalingo API. */
  _apiUrl: string;

  /** URL to the Scalingo Authentication API. */
  _authApiUrl: string;

  /** URL to the Scalingo Billing API. */
  _billingApiUrl: string;

  /** Global HTTP headers */
  _headers: Record<string, any>;

  /**
   * Create a new Client for the Scalingo API.
   * @param token Bearer Token for the current user.
   * @param opts Optional configuration
   * @param opts.apiUrl
   * @param opts.authApiUrl=https://auth.scalingo.com] - URL to the Scalingo Authentication API.
   * @param opts.billingApiUrl=https://cashmachine.scalingo.com] - URL to the Scalingo Billing API.
   * @param opts.noUserAgent=false] - Do not set the user agent
   */
  constructor(token: string, opts: ScalingoClientOptions = {}) {
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

  Apps = new Apps(this);
  Addons = new Addons(this);
  Alerts = new Alerts(this);
  Autoscalers = new Autoscalers(this);
  AuditLogs = new AuditLogs(this);
  Billing = new Billing(this);
  Collaborators = new Collaborators(this);
  Containers = new Containers(this);
  CronTasks = new CronTasks(this);
  Deployments = new Deployments(this);
  Domains = new Domains(this);
  Environment = new Environment(this);
  Events = new Events(this);
  Keys = new Keys(this);
  Logs = new Logs(this);
  Metrics = new Metrics(this);
  Notifiers = new Notifiers(this);
  NotificationPlatforms = new NotificationPlatforms(this);
  Operations = new Operations(this);
  SCMIntegrations = new SCMIntegrations(this);
  SCMRepoLinks = new SCMRepoLinks(this);
  Stats = new Stats(this);
  Tokens = new Tokens(this);
  TwoFactorAuth = new TwoFactorAuth(this);
  Users = new Users(this);

  /**
   * Create an axios instance configured for the Scalingo API
   * @return Axios client for the Scalingo API
   */
  apiClient(): AxiosInstance {
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
  authApiClient(): AxiosInstance {
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
  billingApiClient(): AxiosInstance {
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
  unauthenticatedClient(): AxiosInstance {
    return axios.create({
      baseURL: `${this._apiUrl}/v1/`,
      headers: this._headers,
    });
  }
}

export class EndpointClient {
  /** Scalingo API Client */
  _client: Client;

  /**
   * Create a new "thematic" client
   * @param client Scalingo API Client
   */
  constructor(client: Client) {
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
export async function clientFromToken(
  token: string,
  opts: ScalingoClientOptions
): Promise<Client> {
  const client = new Client("", opts);
  const bearerToken = (await client.Tokens.exchange(token)) as string;
  client._token = bearerToken;
  return client;
}
