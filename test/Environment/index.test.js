import Environment from "../../src/Environment";
import {
  testGetter,
  testPost,
  testUpdate,
  testDelete,
  testPut,
} from "../utils/http";

describe("Environment#for", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/tata/variables",
    null,
    "variables",
    (client) => {
      return new Environment(client).for("tata");
    }
  );
});

describe("Environment#create", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/apps/tata/variables",
    null,
    { variable: { name: "tata", value: "$toto" } },
    "variable",
    (client) => {
      return new Environment(client).create("tata", {
        name: "tata",
        value: "$toto",
      });
    }
  );
});

describe("Environment#bulkUpdate", () => {
  testPut(
    "https://api.osc-fr1.scalingo.com/v1/apps/tata/variables",
    {
      variables: [
        { name: "tata", value: "$toto" },
        { name: "tutu", value: "$tete" },
      ],
    },
    "variables",
    (client) => {
      return new Environment(client).bulkUpdate("tata", [
        { name: "tata", value: "$toto" },
        { name: "tutu", value: "$tete" },
      ]);
    }
  );
});

describe("Environment#update", () => {
  testUpdate(
    "https://api.osc-fr1.scalingo.com/v1/apps/tata/variables/54101384736f7563d5040000",
    { variable: { value: "$toto" } },
    "variable",
    (client) => {
      return new Environment(client).update(
        "tata",
        "54101384736f7563d5040000",
        "$toto"
      );
    }
  );
});

describe("Environment#destroy", () => {
  testDelete(
    "https://api.osc-fr1.scalingo.com/v1/apps/tata/variables/54101384736f7563d5040000",
    null,
    (client) => {
      return new Environment(client).destroy(
        "tata",
        "54101384736f7563d5040000"
      );
    }
  );
});

describe("Environment#bulkDestroy", () => {
  testDelete(
    "https://api.osc-fr1.scalingo.com/v1/apps/tata/variables",
    null,
    (client) => {
      return new Environment(client).bulkDestroy("tata", [
        "54101384736f7563d5040000",
        "54101384736f7563d5040001",
      ]);
    }
  );
});
