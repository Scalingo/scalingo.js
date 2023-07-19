import Events from "../../src/Events";
import { testGetter, testParamsGetter } from "../utils/http";

describe("Events#all", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/events",
    null,
    null,
    (client) => {
      return new Events(client).all({ page: 1, from: 2 });
    },
  );

  testParamsGetter(
    "https://api.osc-fr1.scalingo.com/v1/events",
    { page: 1, per_page: 2, from: 1 },
    null,
    (client) => {
      return new Events(client).all({ page: 1, per_page: 2, from: 1 });
    },
  );
});

describe("Events#for", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/tata/events",
    null,
    null,
    (client) => {
      return new Events(client).for("tata", { page: 1, from: 2 });
    },
  );

  testParamsGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/tata/events",
    { page: 1, per_page: 2, from: 1 },
    null,
    (client) => {
      return new Events(client).for("tata", { page: 1, per_page: 2, from: 1 });
    },
  );
});

describe("Events#find", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/tata/events/someevent",
    null,
    "event",
    (client) => {
      return new Events(client).find("tata", "someevent");
    },
  );
});

describe("Events#listEventTypes", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/event_types",
    { noAuth: true },
    "event_types",
    (client) => {
      return new Events(client).listEventTypes();
    },
  );
});

describe("Events#listEventCategories", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/event_categories",
    { noAuth: true },
    "event_categories",
    (client) => {
      return new Events(client).listEventCategories();
    },
  );
});
