import { Client } from "..";
import {
  Database,
  DashboardDatabase,
  CreateParams,
  FirewallRule,
  CreateFirewallRuleParams,
  UpdateFirewallRuleParams,
  ManagedRange,
} from "../models/regional/databases";
import { unpackData } from "../utils";

/**
 * Databases API Client
 */
export default class Databases {
  /** Scalingo API Client */
  _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Get all databases for the current user
   * @param opts Object with optional params (ex: dashboard)
   * @return Promise that when resolved returns a Database array.
   */

  all(opts?: {
    dashboard?: boolean;
  }): Promise<Database[] | DashboardDatabase[]> {
    return unpackData(
      this._client.apiClient().get("/databases", { params: opts }),
    );
  }

  /**
   * Create a new database
   * @param addon_provider_id ID of the addon provider
   * @param plan_id ID of the plan
   * @param database_name Name of the database
   *
   * @return Promise that when resolved returns the new database.
   */

  create(
    createParams: CreateParams,
  ): Promise<Database[] | DashboardDatabase[]> {
    return unpackData(
      this._client.apiClient().post("/databases", { database: createParams }),
      "apps",
    );
  }

  /**
   * List firewall rules for a dedicated database
   * @param databaseId ID of the database
   * @return Promise that when resolved returns the firewall rules attached to the database.
   */
  firewallRules(databaseId: string): Promise<FirewallRule[]> {
    return unpackData(
      this._client.apiClient().get(`/databases/${databaseId}/firewall_rules`),
      "rules",
    );
  }

  /**
   * Create a firewall rule for a dedicated database
   * @param databaseId ID of the database
   * @param params Parameters describing the rule to create
   * @return Promise resolving to the created firewall rule.
   */
  createFirewallRule(
    databaseId: string,
    params: CreateFirewallRuleParams,
  ): Promise<FirewallRule> {
    return unpackData(
      this._client
        .apiClient()
        .post(`/databases/${databaseId}/firewall_rules`, params),
      "rule",
    );
  }

  /**
   * Update a firewall rule for a dedicated database
   * @param databaseId ID of the database
   * @param ruleId ID of the firewall rule to update
   * @param params Payload containing the new label
   * @return Promise resolving to the updated firewall rule.
   */
  updateFirewallRule(
    databaseId: string,
    ruleId: string,
    params: UpdateFirewallRuleParams,
  ): Promise<FirewallRule> {
    return unpackData(
      this._client
        .apiClient()
        .patch(`/databases/${databaseId}/firewall_rules/${ruleId}`, params),
      "rule",
    );
  }

  /**
   * Delete a firewall rule for a dedicated database
   * @param databaseId ID of the database
   * @param ruleId ID of the firewall rule to delete
   */
  deleteFirewallRule(databaseId: string, ruleId: string): Promise<void> {
    return unpackData(
      this._client
        .apiClient()
        .delete(`/databases/${databaseId}/firewall_rules/${ruleId}`),
    );
  }

  /**
   * List firewall managed ranges available to the current user
   * @return Promise resolving to the list of managed ranges
   */
  firewallManagedRanges(): Promise<ManagedRange[]> {
    return unpackData(
      this._client.apiClient().get("/firewall/managed_ranges"),
      "ranges",
    );
  }
}
