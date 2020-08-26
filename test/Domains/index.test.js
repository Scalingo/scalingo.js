import { testGetter, testPost, testUpdate, testDelete } from "../utils/http";
import Domains from "../../src/Domains";

describe("Domains#for", () => {
  testGetter(
    "https://api.scalingo.com/v1/apps/tata/domains",
    null,
    "domains",
    (client) => {
      return new Domains(client).for("tata");
    }
  );
});

describe("Domains#create", () => {
  testPost(
    "https://api.scalingo.com/v1/apps/tata/domains",
    null,
    { domain: { name: "nice.one.dude", tlscert: null, tlskey: null } },
    "domain",
    (client) => {
      return new Domains(client).create("tata", {
        name: "nice.one.dude",
        tlscert: null,
        tlskey: null,
      });
    }
  );
});

describe("Domains#destroy", () => {
  testDelete(
    "https://api.scalingo.com/v1/apps/tata/domains/541067ec736f7504a5110000",
    (client) => {
      return new Domains(client).destroy("tata", "541067ec736f7504a5110000");
    }
  );
});

describe("Domains#show", () => {
  testGetter(
    "https://api.scalingo.com/v1/apps/tata/domains/541067ec736f7504a5110000",
    null,
    "domain",
    (client) => {
      return new Domains(client).show("tata", "541067ec736f7504a5110000");
    }
  );
});

describe("Domains#update", () => {
  testUpdate(
    "https://api.scalingo.com/v1/apps/tata/domains/541067ec736f7504a5110000",
    { domain: { tlscert: null, tlskey: null, canonical: false } },
    "domain",
    (client) => {
      return new Domains(client).update("tata", "541067ec736f7504a5110000", {
        tlscert: null,
        tlskey: null,
        canonical: false,
      });
    }
  );
});
