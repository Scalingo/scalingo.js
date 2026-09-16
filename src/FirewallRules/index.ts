import { Client } from "..";
import { AppFirewallRule } from "../models/regional/app-firewall-rules";
import { CreateParams } from "../params/regional/app-firewall-rules";
import { unpackData } from "../utils";

/**
 * Application Firewall Rules API Client
 */
export default class FirewallRules {
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
   * List all firewall rules for the application.
   * @param appID ID of the application
   * @return Promise that when resolved returns an AppFirewallRule array.
   */
  all(appID: string): Promise<AppFirewallRule[]> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appID}/firewall_rules`),
      "firewall_rules",
    );
  }

  /**
   * Fetch a specific firewall rule for the application.
   * @param appID ID of the application
   * @param id ID of the firewall rule
   * @return Promise that when resolved returns an AppFirewallRule.
   */
  find(appID: string, id: string): Promise<AppFirewallRule> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appID}/firewall_rules/${id}`),
      "firewall_rule",
    );
  }

  /**
   * Create a new firewall rule for the application.
   * @param appID ID of the application
   * @param payload Firewall rule creation parameters
   * @return Promise that when resolved returns the created AppFirewallRule.
   */
  create(appID: string, payload: CreateParams): Promise<AppFirewallRule> {
    return unpackData(
      this._client.apiClient().post(`/apps/${appID}/firewall_rules`, {
        firewall_rule: payload,
      }),
      "firewall_rule",
    );
  }

  /**
   * Delete a firewall rule for the application.
   * @param appID ID of the application
   * @param id ID of the firewall rule
   * @return Promise that resolves when the firewall rule is deleted.
   */
  destroy(appID: string, id: string): Promise<void> {
    return unpackData(
      this._client.apiClient().delete(`/apps/${appID}/firewall_rules/${id}`),
    );
  }
}
