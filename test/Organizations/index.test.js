import Organizations from "../../src/Organizations";
import { testGetter } from "../utils/http";

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
