import Organizations from "../../src/Organizations";
import {
  testDelete,
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

describe("Organizations#show", () => {
  testGetter(
    "https://auth.scalingo.com/v1/organizations/org-reference",
    null,
    "organization",
    (client) => {
      return new Organizations(client).show("org-reference");
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

describe("Organizations#destroy", () => {
  testDelete(
    "https://auth.scalingo.com/v1/organizations/org-id",
    null,
    (client) => {
      return new Organizations(client).destroy("org-id");
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

describe("Organizations#members", () => {
  testGetter(
    "https://auth.scalingo.com/v1/organizations/org-id/members",
    null,
    "members",
    (client) => {
      return new Organizations(client).members("org-id");
    },
  );
});

describe("Organizations#invitations", () => {
  testGetter(
    "https://auth.scalingo.com/v1/organizations/org-id/invitations",
    null,
    "invitations",
    (client) => {
      return new Organizations(client).invitations("org-id");
    },
  );
});

describe("Organizations#destroyInvitation", () => {
  testDelete(
    "https://auth.scalingo.com/v1/organizations/org-id/invitations/invitation-id",
    null,
    (client) => {
      return new Organizations(client).destroyInvitation(
        "org-id",
        "invitation-id",
      );
    },
  );
});
