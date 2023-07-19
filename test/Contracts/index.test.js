import Contracts from "../../src/Contracts";
import { testGetter, testPost } from "../utils/http";

describe("Contracts#list", () => {
  testGetter(
    "https://auth.scalingo.com/v1/contracts",
    null,
    "contracts",
    (client) => {
      return new Contracts(client).list();
    },
  );
});

describe("Contracts#history", () => {
  testGetter(
    "https://auth.scalingo.com/v1/contracts/history",
    null,
    "contracts",
    (client) => {
      return new Contracts(client).history();
    },
  );
});

describe("Contracts#find", () => {
  testGetter(
    "https://auth.scalingo.com/v1/contracts/contract-id",
    null,
    "contract",
    (client) => {
      return new Contracts(client).find("contract-id");
    },
  );
});

describe("Contracts#accept", () => {
  testPost(
    "https://auth.scalingo.com/v1/contracts/contract-id/accept",
    null,
    { locale: "es" },
    "contract",
    (client) => {
      return new Contracts(client).accept("contract-id", "es");
    },
  );
});
