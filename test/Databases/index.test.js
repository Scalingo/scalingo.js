import Databases from "../../src/Databases";
import { testGetter, testPost } from "../utils/http";

describe("Databases#all (dashboard)", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/databases",
    { params: { dashboard: true } },
    "databases",
    (client) => {
      return new Databases(client).all({ dashboard: true });
    },
  );
});

describe("Databases#all (classic)", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/databases",
    {},
    "databases",
    (client) => {
      return new Databases(client).all();
    },
  );
});

describe("Databases#show", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/databases/db-id",
    {},
    null,
    (client) => {
      return new Databases(client).show("db-id");
    },
  );
});

describe("Databases#create", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/databases",
    null,
    {
      database: {
        name: "db-name",
        technology: "postgresql",
        plan: "sandbox",
      },
    },
    "apps",
    (client) => {
      return new Databases(client).create({
        technology: "postgresql",
        plan: "sandbox",
        name: "db-name",
      });
    },
  );
});
