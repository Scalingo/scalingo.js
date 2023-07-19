import Regions from "../../src/Regions";
import { testGetter } from "../utils/http";

describe("Regions#all", () => {
  testGetter(
    "https://auth.scalingo.com/v1/regions",
    null,
    "regions",
    (client) => {
      return new Regions(client).all();
    },
  );
});
