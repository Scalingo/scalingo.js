import Users from "../../src/Users";
import { testGetter, testPost, testPut } from "../utils/http";

describe("Users#self", () => {
  testGetter(
    "https://auth.scalingo.com/v1/users/self",
    null,
    "user",
    (client) => {
      return new Users(client).self();
    }
  );
});

describe("Users#updateAccount", () => {
  testPut(
    "https://auth.scalingo.com/v1/users/account",
    { user: { company: "New company" } },
    "user",
    (client) => {
      return new Users(client).updateAccount({
        company: "New company",
      });
    }
  );
});

describe("Users#stopFreeTrial", () => {
  testPost(
    "https://auth.scalingo.com/v1/users/stop_free_trial",
    null,
    null,
    null,
    (client) => {
      return new Users(client).stopFreeTrial();
    }
  );
});

describe("Users#requestAccountDeletion", () => {
  testPost(
    "https://auth.scalingo.com/v1/users/delete",
    null,
    null,
    null,
    (client) => {
      return new Users(client).requestAccountDeletion();
    }
  );
});

describe("Users#confirmAccountDeletion", () => {
  const deletion = { token: "token" };

  testPost(
    "https://auth.scalingo.com/v1/users/delete/some-id/confirm",
    null,
    { deletion },
    null,
    (client) => {
      return new Users(client).confirmAccountDeletion("some-id", deletion);
    }
  );
});
