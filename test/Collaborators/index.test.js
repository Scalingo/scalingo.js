import Collaborators from "../../src/Collaborators";
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
