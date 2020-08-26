import { testGetter, testPost, testPut } from "../utils/http";
import Billing from "../../src/Billing";

describe("Billing#profile", () => {
  testGetter(
    "https://cashmachine.scalingo.com/profile",
    null,
    "profile",
    (client) => {
      return new Billing(client).profile();
    }
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
    }
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
    }
  );
});
