import Databases from "../../src/Databases";
import { testGetter, testPost } from "../utils/http";

describe("Databases#all (dashboard)", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/databases",
    { params: { dashboard: true } },
    null,
    (client) => {
      return new Databases(client).all({ dashboard: true });
    },
  );
});

describe("Databases#all (classic)", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/databases",
    {},
    null,
    (client) => {
      return new Databases(client).all();
    },
  );
});

describe("Databases#create", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/databases",
    null,
    {
      database: {
        addon_provider_id: "provider-id",
        plan_id: "plan-id",
        name: "db-name",
      },
    },
    "apps",
    (client) => {
      return new Databases(client).create({
        addon_provider_id: "provider-id",
        plan_id: "plan-id",
        name: "db-name",
      });
    },
  );
});
