import DataAccessConsent from "../../src/DataAccessConsent";
import { testPost, testUpdate, testDelete } from "../utils/http";

describe("DataAccessConsent#create", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/apps/test/data_access_consent",
    null,
    {
      data_access_consent: {
        containers_until: "2022-07-06T00:00:00.000+00:00",
        databases_until: "2022-07-08T00:00:00.000+00:00",
      },
    },
    "data_access_consent",
    (client) => {
      return new DataAccessConsent(client).create("test", {
        containers_until: "2022-07-06T00:00:00.000+00:00",
        databases_until: "2022-07-08T00:00:00.000+00:00",
      });
    },
  );
});

describe("DataAccessConsent#update", () => {
  testUpdate(
    "https://api.osc-fr1.scalingo.com/v1/apps/test/data_access_consent",
    {
      data_access_consent: {
        containers_until: "2022-07-10T00:00:00.000+00:00",
      },
    },
    "data_access_consent",
    (client) => {
      return new DataAccessConsent(client).update("test", {
        containers_until: "2022-07-10T00:00:00.000+00:00",
      });
    },
  );
});

describe("DataAccessConsent#destroy", () => {
  testDelete(
    "https://api.osc-fr1.scalingo.com/v1/apps/test/data_access_consent",
    null,
    (client) => {
      return new DataAccessConsent(client).destroy("test");
    },
  );
});
