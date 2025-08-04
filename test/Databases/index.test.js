import Databases from "../../src/Databases";
import { testGetter } from "../utils/http";

describe("Databases#all (dashboard)", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/databases",
    { params: { dashboard: true } },
    "apps",
    (client) => {
      return new Databases(client).all({ dashboard: true });
    },
  );
});

describe("Databases#all (classic)", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/databases",
    {},
    "apps",
    (client) => {
      return new Databases(client).all();
    },
);
});
