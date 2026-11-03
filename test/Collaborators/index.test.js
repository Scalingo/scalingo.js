import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";

import { Client } from "../../src";
import Collaborators from "../../src/Collaborators";
import { APIError } from "../../src/errors";
import {
  testGetter,
  testDelete,
  testPost,
  testPatch,
  testParamsGetter,
} from "../utils/http";
import "../factories";

describe("Collaborators#for", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/toto/collaborators",
    null,
    "collaborators",
    (client) => {
      return new Collaborators(client).for("toto");
    },
  );
});

describe("Collaborators#destroy", () => {
  testDelete(
    "https://api.osc-fr1.scalingo.com/v1/apps/toto/collaborators/1234",
    null,
    (client) => {
      return new Collaborators(client).destroy("toto", "1234");
    },
  );
});

describe("Collaborators#invite", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/apps/toto/collaborators",
    null,
    { collaborator: { email: "toto@titi.tata", is_limited: false } },
    "collaborator",
    (client) => {
      return new Collaborators(client).invite("toto", {
        email: "toto@titi.tata",
        is_limited: false,
      });
    },
  );
});

describe("Collaborators#invite using an email address only", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/apps/toto/collaborators",
    null,
    { collaborator: { email: "toto@titi.tata" } },
    "collaborator",
    (client) => {
      return new Collaborators(client).invite("toto", "toto@titi.tata");
    },
  );
});

describe("Collaborators#candidates", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/toto/collaborators/candidates",
    null,
    "candidates",
    (client) => {
      return new Collaborators(client).candidates("toto");
    },
  );

  it("returns the list of candidates", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);
    const candidates = [
      { id: "us-1", username: "alice", email: "alice@example.com" },
    ];
    mock
      .onGet(
        "https://api.osc-fr1.scalingo.com/v1/apps/toto/collaborators/candidates",
      )
      .reply(200, { candidates });

    const result = await new Collaborators(client).candidates("toto");

    expect(result).to.deep.eq(candidates);
  });

  it("propagates the error when the verification is unavailable", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);
    mock
      .onGet(
        "https://api.osc-fr1.scalingo.com/v1/apps/toto/collaborators/candidates",
      )
      .reply(503, { error: "unable to list the organization members" });

    try {
      await new Collaborators(client).candidates("toto");
    } catch (error) {
      expect(error).to.be.an.instanceOf(APIError);
      expect(error.status).to.eq(503);
      return;
    }
    expect.fail("The method did not throw");
  });
});

describe("Collaborators#addMember", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/apps/toto/collaborators",
    null,
    { collaborator: { user_id: "us-1234", is_limited: true } },
    "collaborator",
    (client) => {
      return new Collaborators(client).addMember("toto", {
        user_id: "us-1234",
        is_limited: true,
      });
    },
  );

  it("sends the user_id only when no role is given", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);
    mock
      .onPost("https://api.osc-fr1.scalingo.com/v1/apps/toto/collaborators")
      .reply(201, { collaborator: { id: "1234", status: "accepted" } });

    const result = await new Collaborators(client).addMember("toto", {
      user_id: "us-1234",
    });

    expect(JSON.parse(mock.history.post[0].data)).to.deep.eq({
      collaborator: { user_id: "us-1234" },
    });
    expect(result).to.deep.eq({ id: "1234", status: "accepted" });
  });

  it("propagates the validation errors", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);
    const errors = {
      user_id: ["the user is not a member of the organization"],
    };
    mock
      .onPost("https://api.osc-fr1.scalingo.com/v1/apps/toto/collaborators")
      .reply(422, { errors });

    try {
      await new Collaborators(client).addMember("toto", { user_id: "us-1234" });
    } catch (error) {
      expect(error).to.be.an.instanceOf(APIError);
      expect(error.status).to.eq(422);
      expect(error.data).to.deep.eq({ errors });
      return;
    }
    expect.fail("The method did not throw");
  });
});

describe("Collaborators#inviteAccept", () => {
  testParamsGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/collaboration",
    { token: "toto-accept-token" },
    null,
    (client) => {
      return new Collaborators(client).inviteAccept("toto-accept-token");
    },
  );
});

describe("Collaborators#all", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/collaborators",
    {},
    null,
    (client) => {
      return new Collaborators(client).all();
    },
  );
});

describe("Collaborators#all with organization scope", () => {
  testParamsGetter(
    "https://api.osc-fr1.scalingo.com/v1/collaborators",
    { organization_id: "org-123" },
    null,
    (client) => new Collaborators(client).all({ organization_id: "org-123" }),
  );
});

describe("Collaborators#update", () => {
  testPatch(
    "https://api.osc-fr1.scalingo.com/v1/apps/toto/collaborators/1234",
    { collaborator: { is_limited: true } },
    "collaborator",
    (client) => {
      return new Collaborators(client).update("toto", "1234", {
        is_limited: true,
      });
    },
  );
});
