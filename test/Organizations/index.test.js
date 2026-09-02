import Organizations from "../../src/Organizations";
import { testGetter, testPost } from "../utils/http";

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
