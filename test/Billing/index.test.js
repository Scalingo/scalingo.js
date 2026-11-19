import Billing from "../../src/Billing";
import { testGetter, testParamsGetter, testPost, testPut } from "../utils/http";

describe("Billing#profile", () => {
  testGetter(
    "https://cashmachine.scalingo.com/profile",
    null,
    "profile",
    (client) => {
      return new Billing(client).profile();
    },
  );
});

describe("Billing#profile with organization scope", () => {
  testParamsGetter(
    "https://cashmachine.scalingo.com/profile",
    { organization_id: "org-123" },
    "profile",
    (client) => new Billing(client).profile({ organization_id: "org-123" }),
  );
});

describe("Billing#createProfile", () => {
  const payload = { some: "payload" };

  testPost(
    "https://cashmachine.scalingo.com/profiles",
    null,
    { profile: payload },
    "profile",
    (client) => {
      return new Billing(client).createProfile(payload);
    },
  );
});

describe("Billing#createProfile with organization scope", () => {
  const payload = { some: "payload" };

  testPost(
    "https://cashmachine.scalingo.com/profiles",
    null,
    { organization_id: "org-123", profile: payload },
    "profile",
    (client) =>
      new Billing(client).createProfile(payload, {
        organization_id: "org-123",
      }),
  );
});

describe("Billing#updateProfile", () => {
  const payload = { some: "payload" };

  testPut(
    "https://cashmachine.scalingo.com/profiles/test-id",
    { profile: payload },
    "profile",
    (client) => {
      return new Billing(client).updateProfile("test-id", payload);
    },
  );
});
