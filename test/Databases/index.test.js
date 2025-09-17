import Databases from "../../src/Databases";
import { testGetter, testPost, testDelete, testUpdate } from "../utils/http";

describe("Databases#all (dashboard)", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/databases",
    { params: { dashboard: true } },
    null,
    (client) => {
      return new Databases(client).all({ dashboard: true });
    },
  );
});

describe("Databases#all (classic)", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/databases",
    {},
    null,
    (client) => {
      return new Databases(client).all();
    },
  );
});

describe("Databases#create", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/databases",
    null,
    {
      database: {
        addon_provider_id: "provider-id",
        plan_id: "plan-id",
        database_name: "db-name",
      },
    },
    "apps",
    (client) => {
      return new Databases(client).create({
        addon_provider_id: "provider-id",
        plan_id: "plan-id",
        database_name: "db-name",
      });
    },
  );
});

describe("Databases#firewallRules", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/databases/db-id/firewall_rules",
    null,
    "rules",
    (client) => {
      return new Databases(client).firewallRules("db-id");
    },
  );
});

describe("Databases#createFirewallRule", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/databases/db-id/firewall_rules",
    null,
    {
      type: "custom_range",
      cidr: "10.20.0.0/32",
      label: "My custom label",
    },
    "rule",
    (client) => {
      return new Databases(client).createFirewallRule("db-id", {
        type: "custom_range",
        cidr: "10.20.0.0/32",
        label: "My custom label",
      });
    },
  );
});

describe("Databases#updateFirewallRule", () => {
  testUpdate(
    "https://api.osc-fr1.scalingo.com/v1/databases/db-id/firewall_rules/rule-id",
    {
      label: "My label",
    },
    "rule",
    (client) => {
      return new Databases(client).updateFirewallRule("db-id", "rule-id", {
        label: "My label",
      });
    },
  );
});

describe("Databases#deleteFirewallRule", () => {
  testDelete(
    "https://api.osc-fr1.scalingo.com/v1/databases/db-id/firewall_rules/rule-id",
    null,
    (client) => {
      return new Databases(client).deleteFirewallRule("db-id", "rule-id");
    },
  );
});

describe("Databases#firewallManagedRanges", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/firewall/managed_ranges",
    null,
    "ranges",
    (client) => {
      return new Databases(client).firewallManagedRanges();
    },
  );
});
