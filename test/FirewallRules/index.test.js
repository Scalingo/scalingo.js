import FirewallRules from "../../src/FirewallRules";
import { testDelete, testGetter, testPost } from "../utils/http";

describe("FirewallRules#all", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/app-id/firewall_rules",
    null,
    "firewall_rules",
    (client) => {
      return new FirewallRules(client).all("app-id");
    },
  );
});

describe("FirewallRules#create", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/apps/app-id/firewall_rules",
    null,
    { firewall_rule: { cidr: "192.0.2.0/24", label: "office" } },
    "firewall_rule",
    (client) => {
      return new FirewallRules(client).create("app-id", {
        cidr: "192.0.2.0/24",
        label: "office",
      });
    },
  );
});

describe("FirewallRules#find", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/app-id/firewall_rules/rule-id",
    null,
    "firewall_rule",
    (client) => {
      return new FirewallRules(client).find("app-id", "rule-id");
    },
  );
});

describe("FirewallRules#destroy", () => {
  testDelete(
    "https://api.osc-fr1.scalingo.com/v1/apps/app-id/firewall_rules/rule-id",
    null,
    (client) => {
      return new FirewallRules(client).destroy("app-id", "rule-id");
    },
  );
});
