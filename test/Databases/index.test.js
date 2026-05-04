import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";

import { Client } from "../../src";
import Databases from "../../src/Databases";
import Backups from "../../src/Databases/Backups";
import { testDelete, testGetter, testPost, testUpdate } from "../utils/http";

describe("Databases#all (dashboard)", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/databases",
    { params: { dashboard: true } },
    "databases",
    (client) => {
      return new Databases(client).all({ dashboard: true });
    },
  );
});

describe("Databases#all (classic)", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/databases",
    {},
    "databases",
    (client) => {
      return new Databases(client).all();
    },
  );
});

describe("Databases#show", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/databases/db-id",
    {},
    null,
    (client) => {
      return new Databases(client).show("db-id");
    },
  );
});

describe("Databases#apiShow", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012",
    {},
    "database",
    (client) => {
      return new Databases(client).apiShow("ad-1234-5678-9012");
    },
  );
});

describe("Databases#apiUpdate", () => {
  testUpdate(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012",
    {
      database: {
        periodic_backups_enabled: true,
        periodic_backups_scheduled_at: [3],
        maintenance_window: {
          weekday_utc: 1,
          starting_hour_utc: 4,
        },
      },
    },
    "database",
    (client) => {
      return new Databases(client).apiUpdate("ad-1234-5678-9012", {
        periodic_backups_enabled: true,
        periodic_backups_scheduled_at: [3],
        maintenance_window: {
          weekday_utc: 1,
          starting_hour_utc: 4,
        },
      });
    },
  );
});

describe("Databases#apiPlan", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/plan",
    {},
    "plan",
    (client) => {
      return new Databases(client).apiPlan("ad-1234-5678-9012");
    },
  );
});

describe("Databases#apiMetrics", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/metrics",
    {},
    null,
    (client) => {
      return new Databases(client).apiMetrics("ad-1234-5678-9012");
    },
  );
});

describe("Databases#apiMetricsType", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/metrics/cpu",
    { params: { since: 3 } },
    null,
    (client) => {
      return new Databases(client).apiMetricsType("ad-1234-5678-9012", "cpu", {
        since: 3,
      });
    },
  );
});

describe("Databases#apiHealth", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/health",
    {},
    null,
    (client) => {
      return new Databases(client).apiHealth("ad-1234-5678-9012");
    },
  );
});

describe("Databases#apiInstancesStatus", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/instances_status",
    {},
    null,
    (client) => {
      return new Databases(client).apiInstancesStatus("ad-1234-5678-9012");
    },
  );
});

describe("Databases#apiLag", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/lag",
    {},
    null,
    (client) => {
      return new Databases(client).apiLag("ad-1234-5678-9012");
    },
  );
});

describe("Databases#apiLogs", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/logs",
    {},
    "url",
    (client) => {
      return new Databases(client).apiLogs("ad-1234-5678-9012");
    },
  );
});

describe("Databases#apiLogsArchives", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/logs_archives",
    { params: { cursor: 2 } },
    null,
    (client) => {
      return new Databases(client).apiLogsArchives("ad-1234-5678-9012", {
        cursor: 2,
      });
    },
  );
});

describe("Databases#listDatabaseTypes", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/database_types",
    {},
    "database_types",
    (client) => {
      return new Databases(client).listDatabaseTypes();
    },
  );
});

describe("Databases#showDatabaseType", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/database_types/5eea3324d6f2bd5a55e2aa9d",
    {},
    "database_type",
    (client) => {
      return new Databases(client).showDatabaseType("5eea3324d6f2bd5a55e2aa9d");
    },
  );
});

describe("Databases#showDatabaseTypeVersion", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/database_type_versions/69aea6e66e8b2491afad1f8c",
    {},
    "database_type_version",
    (client) => {
      return new Databases(client).showDatabaseTypeVersion(
        "69aea6e66e8b2491afad1f8c",
      );
    },
  );
});

describe("Databases#apiPing", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/ping",
    null,
    {},
    null,
    (client) => {
      return new Databases(client).apiPing("ad-1234-5678-9012");
    },
  );
});

describe("Databases#apiUpgrade", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/upgrade",
    null,
    {},
    null,
    (client) => {
      return new Databases(client).apiUpgrade("ad-1234-5678-9012");
    },
  );
});

describe("Databases#apiOperationShow", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/operations/op-123",
    {},
    "operation",
    (client) => {
      return new Databases(client).apiOperationShow(
        "ad-1234-5678-9012",
        "op-123",
      );
    },
  );
});

describe("Databases#apiAction", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/action",
    null,
    {
      action_name: "force-ssl",
      params: { enable: true },
    },
    null,
    (client) => {
      return new Databases(client).apiAction("ad-1234-5678-9012", "force-ssl", {
        enable: true,
      });
    },
  );
});

describe("Databases#apiFirewallRules", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/firewall_rules",
    {},
    "rules",
    (client) => {
      return new Databases(client).apiFirewallRules("ad-1234-5678-9012");
    },
  );
});

describe("Databases#apiCreateFirewallRule", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/firewall_rules",
    null,
    { firewall_rule: { type: "managed_range", range_id: "eu", label: "eu" } },
    "rule",
    (client) => {
      return new Databases(client).apiCreateFirewallRule("ad-1234-5678-9012", {
        type: "managed_range",
        range_id: "eu",
        label: "eu",
      });
    },
  );
});

describe("Databases#apiDeleteFirewallRule", () => {
  testDelete(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/firewall_rules/rule-123",
    null,
    (client) => {
      return new Databases(client).apiDeleteFirewallRule(
        "ad-1234-5678-9012",
        "rule-123",
      );
    },
  );
});

describe("Databases#apiManagedFirewallRanges", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/firewall/managed_ranges",
    {},
    "ranges",
    (client) => {
      return new Databases(client).apiManagedFirewallRanges();
    },
  );
});

describe("Databases#create", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/databases",
    null,
    {
      database: {
        name: "db-name",
        technology: "postgresql",
        plan: "sandbox",
      },
    },
    "apps",
    (client) => {
      return new Databases(client).create({
        technology: "postgresql",
        plan: "sandbox",
        name: "db-name",
      });
    },
  );
});

describe("Databases#backups", () => {
  it("returns a Backups client for the given database", () => {
    const client = new Client("test-token");

    const result = new Databases(client).backups("ad-1234-5678-9012");

    expect(result).to.be.instanceOf(Backups);
    expect(result._client).to.eq(client);
    expect(result._databaseId).to.eq("ad-1234-5678-9012");
  });
});

describe("Databases#caCertificateDownloadURL", () => {
  it("returns the DBaaS CA certificate URL for the default API base", () => {
    const client = new Client("test-token");

    const result = new Databases(client).caCertificateDownloadURL();

    expect(result).to.eq("https://api.osc-fr1.scalingo.com/api/ca_certificate");
  });

  it("uses the configured API base URL", () => {
    const client = new Client("test-token", {
      apiUrl: "https://custom-api.example.com",
    });

    const result = new Databases(client).caCertificateDownloadURL();

    expect(result).to.eq("https://custom-api.example.com/api/ca_certificate");
  });

  it("does not perform an HTTP request", () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);

    const result = new Databases(client).caCertificateDownloadURL();

    expect(result).to.eq("https://api.osc-fr1.scalingo.com/api/ca_certificate");
    expect(mock.history.get).to.have.length(0);

    mock.restore();
  });
});
