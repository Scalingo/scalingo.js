import Organizations from "../../src/Organizations";
import {
  testGetter,
  testParamsGetter,
  testPost,
  testUpdate,
} from "../utils/http";

describe("Organizations#all", () => {
  testGetter(
    "https://auth.scalingo.com/v1/organizations",
    null,
    "organizations",
    (client) => {
      return new Organizations(client).all();
    },
  );
});

describe("Organizations#create", () => {
  testPost(
    "https://auth.scalingo.com/v1/organizations",
    null,
    { organization: { name: "my-org" } },
    "organization",
    (client) => {
      return new Organizations(client).create({ name: "my-org" });
    },
  );
});

describe("Organizations#update", () => {
  testUpdate(
    "https://auth.scalingo.com/v1/organizations/org-id",
    { organization: { name: "my-org" } },
    "organization",
    (client) => {
      return new Organizations(client).update("org-id", { name: "my-org" });
    },
  );
});

describe("Organizations#can", () => {
  testParamsGetter(
    "https://auth.scalingo.com/v1/organizations/org-id/can",
    { scope: "read:organization" },
    "can",
    (client) => {
      return new Organizations(client).can("org-id", "read:organization");
    },
  );
});

describe("Organizations#events", () => {
  testParamsGetter(
    "https://auth.scalingo.com/v1/organizations/org-id/events",
    { page: 1, per_page: 20 },
    null,
    (client) => {
      return new Organizations(client).events("org-id", {
        page: 1,
        per_page: 20,
      });
    },
  );
});
