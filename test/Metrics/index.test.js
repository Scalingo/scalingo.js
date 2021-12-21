import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";

import { Client } from "../../src";
import Metrics from "../../src/Metrics";
import { testGetter } from "../utils/http";

describe("Metrics#types", () => {
  testGetter(
    "https://api.scalingo.com/v1/features/metrics",
    null,
    "metrics",
    (client) => {
      return new Metrics(client).types();
    }
  );
});

describe("Metrics#get", () => {
  describe("with a simple request", () => {
    testGetter(
      "https://api.scalingo.com/v1/apps/toto/stats/router",
      null,
      null,
      (client) => {
        return new Metrics(client).get("toto", "router");
      }
    );
  });

  describe("When requesting container metrics", () => {
    testGetter(
      "https://api.scalingo.com/v1/apps/toto/stats/cpu/web/1",
      null,
      null,
      (client) => {
        return new Metrics(client).get("toto", "cpu", {
          containerIndex: 1,
          containerType: "web",
        });
      }
    );
  });

  describe("When having complex queries", () => {
    it("should pass them as query parameters (since)", async () => {
      const client = new Client("toto");
      const mock = new MockAdapter(axios);
      mock
        .onGet("https://api.scalingo.com/v1/apps/toto/stats/cpu/web", {
          params: { since: 32 },
        })
        .reply(200, {
          test: "value",
        });

      const result = await new Metrics(client).get("toto", "cpu", {
        containerType: "web",
        since: 32,
      });
      expect(result).to.deep.eq({ test: "value" });
    });

    it("should pass them as query parameters (statisticsType)", async () => {
      const client = new Client("toto");
      const mock = new MockAdapter(axios);
      mock
        .onGet("https://api.scalingo.com/v1/apps/toto/stats/requests", {
          params: { statistics_type: "p95" },
        })
        .reply(200, {
          test: "value",
        });

      const result = await new Metrics(client).get("toto", "requests", {
        statisticsType: "p95",
      });
      expect(result).to.deep.eq({ test: "value" });
    });
  });
});
