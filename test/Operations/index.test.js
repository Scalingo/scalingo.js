import { testGetter } from "../utils/http";
import Operations from "../../src/Operations";

describe("Operations#getOperation", () => {
  testGetter(
    "https://api.scalingo.com/v1/apps/toto/operations/tata",
    null,
    "operation",
    (client) => {
      return new Operations(client).operation("toto", "tata");
    }
  );
});
