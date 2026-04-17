import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";

import { Client } from "../../src";
import Databases from "../../src/Databases";
import { testGetter, testPost } from "../utils/http";

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
