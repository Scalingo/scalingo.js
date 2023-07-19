import Alerts from "../../src/Alerts";
import { testGetter, testPost, testUpdate, testDelete } from "../utils/http";

describe("Alerts#for", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/tata/alerts",
    null,
    "alerts",
    (client) => {
      return new Alerts(client).for("tata");
    },
  );
});

describe("Alerts#create", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/apps/tata/alerts",
    null,
    { alert: { some: "params" } },
    "alert",
    (client) => {
      return new Alerts(client).create("tata", { some: "params" });
    },
  );
});

describe("Alerts#destroy", () => {
  testDelete(
    "https://api.osc-fr1.scalingo.com/v1/apps/tata/alerts/541067ec736f7504a5110000",
    null,
    (client) => {
      return new Alerts(client).destroy("tata", "541067ec736f7504a5110000");
    },
  );
});

describe("Alerts#find", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/tata/alerts/541067ec736f7504a5110000",
    null,
    "alert",
    (client) => {
      return new Alerts(client).find("tata", "541067ec736f7504a5110000");
    },
  );
});

describe("Alerts#update", () => {
  testUpdate(
    "https://api.osc-fr1.scalingo.com/v1/apps/tata/alerts/541067ec736f7504a5110000",
    { alert: { some: "params" } },
    "alert",
    (client) => {
      return new Alerts(client).update("tata", "541067ec736f7504a5110000", {
        some: "params",
      });
    },
  );
});
