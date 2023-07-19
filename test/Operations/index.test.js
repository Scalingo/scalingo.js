import Operations from "../../src/Operations";
import { testGetter } from "../utils/http";

describe("Operations#getOperation", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/toto/operations/tata",
    null,
    "operation",
    (client) => {
      return new Operations(client).operation("toto", "tata");
    },
  );
});
