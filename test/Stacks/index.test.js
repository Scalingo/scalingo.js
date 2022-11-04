import Stacks from "../../src/Stacks";
import { testGetter } from "../utils/http";

describe("Stacks#list", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/features/stacks",
    null,
    "stacks",
    (client) => {
      return new Stacks(client).list();
    }
  );
});
