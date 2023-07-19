import TFA from "../../src/TwoFactorAuth";
import { testDelete, testGetter, testPost } from "../utils/http";

describe("TwoFactorAuth#status", () => {
  testGetter(
    "https://auth.scalingo.com/v1/client/tfa",
    null,
    "tfa",
    (client) => {
      return new TFA(client).status();
    },
  );
});

describe("TwoFactorAuth#initiate", () => {
  const expectedBody = { tfa: { provider: "totp" } };

  testPost(
    "https://auth.scalingo.com/v1/client/tfa",
    null,
    expectedBody,
    "tfa",
    (client) => {
      return new TFA(client).initiate();
    },
  );
});

describe("TwoFactorAuth#initiate with other provider", () => {
  const expectedBody = { tfa: { provider: "otherProvider" } };

  testPost(
    "https://auth.scalingo.com/v1/client/tfa",
    null,
    expectedBody,
    "tfa",
    (client) => {
      return new TFA(client).initiate("otherProvider");
    },
  );
});

describe("TwoFactorAuth#validate", () => {
  const expectedBody = { tfa: { attempt: 5223 } };

  testPost(
    "https://auth.scalingo.com/v1/client/tfa/validate",
    null,
    expectedBody,
    "tfa",
    (client) => {
      return new TFA(client).validate(5223);
    },
  );
});

describe("TwoFactorAuth#disable", () => {
  testDelete("https://auth.scalingo.com/v1/client/tfa", null, (client) => {
    return new TFA(client).disable();
  });
});
