import DataAccessConsents from "../../src/DataAccessConsents";
import { testGetter, testPost } from "../utils/http";

describe("DataAccessConsents#all", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/test/data_access_consents",
    null,
    "data_access_consents",
    (client) => {
      return new DataAccessConsents(client).all("test");
    }
  );
});

describe("DataAccessConsents#createAgreement", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/apps/test/data_access_consents",
    null,
    {
      data_access_consent: {
        containers: false,
        databases: true,
        end_at: "2022-07-14",
      },
    },
    "data_access_consent",
    (client) => {
      return new DataAccessConsents(client).createDataAccessConsent(
        "test",
        "2022-07-14",
        true,
        false
      );
    }
  );
});
