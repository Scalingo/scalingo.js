import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";

import { Client } from "../../src";
import { APIError } from "../../src/errors";
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

  testParamsGetter(
    "https://auth.scalingo.com/v1/organizations",
    { with_admins: true },
    "organizations",
    (client) => {
      return new Organizations(client).all({ with_admins: true });
    },
  );

  testParamsGetter(
    "https://auth.scalingo.com/v1/organizations",
    { with_admins: false },
    "organizations",
    (client) => {
      return new Organizations(client).all({ with_admins: false });
    },
  );

  it("does not send any query parameter without options", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);
    mock
      .onGet("https://auth.scalingo.com/v1/organizations")
      .reply(200, { organizations: [] });

    await new Organizations(client).all();

    expect(mock.history.get).to.have.length(1);
    expect(mock.history.get[0].params).to.be.undefined;
  });

  it("returns the role and the admins of each organization when requested", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);
    const organizations = [
      {
        id: "org-1",
        name: "First org",
        slug: "first-org",
        created_at: "2024-05-15T12:34:56.000Z",
        flags: {},
        limits: {},
        role: "admin",
        membership_id: "mem-1",
        admins: [
          { id: "us-1", username: "alice", email: "alice@example.com" },
          { id: "us-2", username: "bob", email: "bob@example.com" },
        ],
      },
      {
        id: "org-2",
        name: "Second org",
        slug: "second-org",
        created_at: "2024-05-16T12:34:56.000Z",
        flags: {},
        limits: {},
        role: "member",
        membership_id: "mem-2",
        admins: [{ id: "us-3", username: "carol", email: "carol@example.com" }],
      },
    ];
    mock
      .onGet("https://auth.scalingo.com/v1/organizations", {
        params: { with_admins: true },
      })
      .reply(200, { organizations });

    const result = await new Organizations(client).all({ with_admins: true });

    expect(result).to.deep.eq(organizations);
    expect(mock.history.get).to.have.length(1);
  });
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
    null,
    (client) => {
      return new Organizations(client).members("org-id");
    },
  );

  testParamsGetter(
    "https://auth.scalingo.com/v1/organizations/org-id/members",
    { page: 2, per_page: 20 },
    null,
    (client) => {
      return new Organizations(client).members("org-id", {
        page: 2,
        per_page: 20,
      });
    },
  );
});

describe("Organizations#destroyMember", () => {
  const url =
    "https://auth.scalingo.com/v1/organizations/org-id/members/membership-id";

  it("removes the membership and resolves without a body on a 204", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);
    mock.onDelete(url).reply(204);

    const result = await new Organizations(client).destroyMember(
      "org-id",
      "membership-id",
    );

    expect(result).to.satisfy((value) => value === undefined || value === "");
    expect(mock.history.delete).to.have.length(1);
    expect(mock.history.delete[0].headers.Authorization).to.eq(
      "Bearer test-token",
    );
    expect(mock.history.delete[0].data).to.be.undefined;
  });

  it("keeps the detail of a business refusal", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);
    mock
      .onDelete(url)
      .reply(422, { error: "Cannot remove a member who owns projects" });

    try {
      await new Organizations(client).destroyMember("org-id", "membership-id");
    } catch (error) {
      expect(error).to.be.an.instanceOf(APIError);
      expect(error.status).to.eq(422);
      expect(error.data).to.deep.eq({
        error: "Cannot remove a member who owns projects",
      });
      return;
    }
    expect.fail("The method did not throw");
  });
});

describe("Organizations#invitations", () => {
  testGetter(
    "https://auth.scalingo.com/v1/organizations/org-id/invitations",
    null,
    null,
    (client) => {
      return new Organizations(client).invitations("org-id");
    },
  );

  testParamsGetter(
    "https://auth.scalingo.com/v1/organizations/org-id/invitations",
    { page: 2, per_page: 20 },
    null,
    (client) => {
      return new Organizations(client).invitations("org-id", {
        page: 2,
        per_page: 20,
      });
    },
  );
});

describe("Organizations#createInvitation", () => {
  testPost(
    "https://auth.scalingo.com/v1/organizations/org-id/invitations",
    null,
    { invitation: { email: "john@example.com" } },
    "invitation",
    (client) => {
      return new Organizations(client).createInvitation("org-id", {
        email: "john@example.com",
      });
    },
  );
});

describe("Organizations#bulkCreateInvitations", () => {
  testPost(
    "https://auth.scalingo.com/v1/organizations/org-id/invitations/bulk",
    null,
    { invitation: { emails: ["john@example.com", "jane@example.com"] } },
    "invitations",
    (client) => {
      return new Organizations(client).bulkCreateInvitations("org-id", {
        emails: ["john@example.com", "jane@example.com"],
      });
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
