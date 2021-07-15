import { testDelete, testGetter, testPost } from "../utils/http";
import Deployments from "../../src/Deployments";

describe("Deployments#find", () => {
  testGetter(
    "https://api.scalingo.com/v1/apps/testApp/deployments/deploy1234",
    null,
    "deployment",
    (client) => {
      return new Deployments(client).find("testApp", "deploy1234");
    }
  );
});

describe("Deployments#create", () => {
  testPost(
    "https://api.scalingo.com/v1/apps/toto/deployments",
    null,
    { deployment: { source_url: "some-url" } },
    "deployment",
    (client) => {
      return new Deployments(client).create("toto", {
        source_url: "some-url",
      });
    }
  );
});

describe("Deployments#logs", () => {
  testGetter(
    "https://api.scalingo.com/v1/apps/testApp/deployments/deploy1234/output",
    null,
    null,
    (client) => {
      return new Deployments(client).logs("testApp", "deploy1234");
    }
  );
});

describe("Deployments#purge", () => {
  testDelete(
    "https://api.scalingo.com/v1/apps/testApp/caches/deployment",
    (client) => {
      return new Deployments(client).purgeCache("testApp");
    }
  );
});
