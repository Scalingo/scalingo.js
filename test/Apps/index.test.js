import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";
import sinon from "sinon";

import { Client } from "../../src";
import Apps from "../../src/Apps";
import Listener from "../../src/Deployments/listener";
import { testDelete, testGetter, testPost, testUpdate } from "../utils/http";

describe("App#all", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps",
    null,
    "apps",
    (client) => {
      return new Apps(client).all();
    }
  );
});

describe("App#find", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/toto",
    null,
    "app",
    (client) => {
      return new Apps(client).find("toto");
    }
  );
});

describe("App#deploymentListener", () => {
  it("should instantiate the Listener", async () => {
    const client = new Apps(new Client("test-token"));
    const mock = new MockAdapter(axios);

    mock.onGet(`https://api.osc-fr1.scalingo.com/v1/apps/testApp`).reply(200, {
      app: {
        links: {
          deployments_stream: "wss://test.dev/apps/testApp",
        },
      },
    });

    // Prevent the listener to really open the connection
    const stub = sinon.stub(Listener.prototype, "start");
    const listener = await client.deploymentListener("testApp");
    expect(listener.url).to.eq("wss://test.dev/apps/testApp");
    stub.restore();
  });
});

describe("App#create", () => {
  describe("With a simple request", () => {
    testPost(
      "https://api.osc-fr1.scalingo.com/v1/apps",
      null,
      { app: { name: "testApp" } },
      "app",
      (client) => {
        return new Apps(client).create({ name: "testApp" });
      }
    );
  });

  describe("Using custom params", () => {
    testPost(
      "https://api.osc-fr1.scalingo.com/v1/apps",
      null,
      {
        app: {
          name: "testApp",
          git_source: "https://github.com/test/test",
          stack_id: "abcdef",
          parent_id: "abcdef1234",
        },
      },
      "app",
      (client) => {
        return new Apps(client).create({
          name: "testApp",
          git_source: "https://github.com/test/test",
          stack_id: "abcdef",
          parent_id: "abcdef1234",
        });
      }
    );
  });

  describe("Using the dry_run param", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);

    mock.onPost("https://api.osc-fr1.scalingo.com/v1/apps").reply(200, {
      app: {
        name: "testApp",
      },
    });
    await new Apps(client).create("testApp", { dry_run: true });
    expect(mock.history.post[0].headers["X-Dry-Run"]).to.eq("true");
  });
});

describe("App#logsURL", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/testApp/logs",
    null,
    "logs_url",
    (client) => {
      return new Apps(client).logsURL("testApp");
    }
  );
});

describe("App#destroy", () => {
  testDelete("https://api.osc-fr1.scalingo.com/v1/apps/app-id", (client) => {
    return new Apps(client).destroy("app-id", "app-name");
  });
});

describe("App#rename", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/apps/app-id/rename",
    null,
    { current_name: "app-name", new_name: "app-new-name" },
    "app",
    (client) => {
      return new Apps(client).rename("app-id", "app-name", "app-new-name");
    }
  );
});

describe("App#transfer", () => {
  testUpdate(
    "https://api.osc-fr1.scalingo.com/v1/apps/app-id",
    { app: { owner: "owner@example.com" } },
    "app",
    (client) => {
      return new Apps(client).transfer(
        "app-id",
        "app-name",
        "owner@example.com"
      );
    }
  );
});

describe("App#update", () => {
  testUpdate(
    "https://api.osc-fr1.scalingo.com/v1/apps/app-id",
    { app: { force_https: true } },
    "app",
    (client) => {
      return new Apps(client).update("app-id", { force_https: true });
    }
  );
});
