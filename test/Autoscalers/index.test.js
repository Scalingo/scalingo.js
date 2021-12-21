import Autoscalers from "../../src/Autoscalers";
import { testGetter, testPost, testUpdate, testDelete } from "../utils/http";

describe("Autoscalers#for", () => {
  testGetter(
    "https://api.scalingo.com/v1/apps/tata/autoscalers",
    null,
    "autoscalers",
    (client) => {
      return new Autoscalers(client).for("tata");
    }
  );
});

describe("Autoscalers#create", () => {
  testPost(
    "https://api.scalingo.com/v1/apps/tata/autoscalers",
    null,
    { autoscaler: { some: "params" } },
    "autoscaler",
    (client) => {
      return new Autoscalers(client).create("tata", { some: "params" });
    }
  );
});

describe("Autoscalers#destroy", () => {
  testDelete(
    "https://api.scalingo.com/v1/apps/tata/autoscalers/541067ec736f7504a5110000",
    (client) => {
      return new Autoscalers(client).destroy(
        "tata",
        "541067ec736f7504a5110000"
      );
    }
  );
});

describe("Autoscalers#show", () => {
  testGetter(
    "https://api.scalingo.com/v1/apps/tata/autoscalers/541067ec736f7504a5110000",
    null,
    "autoscaler",
    (client) => {
      return new Autoscalers(client).show("tata", "541067ec736f7504a5110000");
    }
  );
});

describe("Autoscalers#update", () => {
  testUpdate(
    "https://api.scalingo.com/v1/apps/tata/autoscalers/541067ec736f7504a5110000",
    { autoscaler: { some: "params" } },
    "autoscaler",
    (client) => {
      return new Autoscalers(client).update(
        "tata",
        "541067ec736f7504a5110000",
        { some: "params" }
      );
    }
  );
});
