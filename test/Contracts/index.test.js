import Contracts from "../../src/Contracts";
import { testGetter, testPost } from "../utils/http";

describe("Contracts#all", () => {
  testGetter(
    "https://auth.scalingo.com/v1/contracts",
    null,
    "contracts",
    (client) => {
      return new Contracts(client).all();
    }
  );
});

describe("Contracts#allAgreements", () => {
  testGetter(
    "https://auth.scalingo.com/v1/contract_agreements",
    null,
    "contract_agreements",
    (client) => {
      return new Contracts(client).allAgreements();
    }
  );
});

describe("Contracts#show", () => {
  testGetter(
    "https://auth.scalingo.com/v1/contracts/contract-id",
    null,
    "contract",
    (client) => {
      return new Contracts(client).show("contract-id");
    }
  );
});

describe("Contracts#showAgreement", () => {
  testGetter(
    "https://auth.scalingo.com/v1/contract_agreements/contract-id",
    null,
    "contract_agreement",
    (client) => {
      return new Contracts(client).showAgreement("contract-id");
    }
  );
});

describe("Contracts#createAgreement", () => {
  testPost(
    "https://auth.scalingo.com/v1/contract_agreements",
    null,
    { contract_agreement: { contract_id: "my-id", locale: "es" } },
    "contract_agreement",
    (client) => {
      return new Contracts(client).createAgreement({
        contract_id: "my-id",
        locale: "es",
      });
    }
  );
});
