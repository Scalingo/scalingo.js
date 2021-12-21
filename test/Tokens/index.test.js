import Tokens from "../../src/Tokens";
import { testDelete, testGetter, testPost, testUpdate } from "../utils/http";

describe("Tokens#list", () => {
  testGetter(
    "https://auth.scalingo.com/v1/tokens",
    null,
    "tokens",
    (client) => {
      return new Tokens(client).all();
    }
  );
});

describe("Tokens#create", () => {
  const expectedBody = { name: "some-token" };

  testPost(
    "https://auth.scalingo.com/v1/tokens",
    null,
    expectedBody,
    "token",
    (client) => {
      return new Tokens(client).create("some-token");
    }
  );
});

describe("Tokens#renew", () => {
  testUpdate(
    "https://auth.scalingo.com/v1/tokens/some-id/renew",
    null,
    "token",
    (client) => {
      return new Tokens(client).renew("some-id");
    }
  );
});

describe("Tokens#destroy", () => {
  testDelete("https://auth.scalingo.com/v1/tokens/some-id", (client) => {
    return new Tokens(client).destroy("some-id");
  });
});
