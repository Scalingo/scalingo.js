import Databases from "../../../src/Databases";
import { testGetter } from "../../utils/http";

describe("Maintenances#all", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/maintenance",
    {},
    null,
    (client) => {
      return new Databases(client).maintenances("ad-1234-5678-9012").all();
    },
  );
});

describe("Maintenances#all with pagination", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/maintenance",
    { params: { page: 2 } },
    null,
    (client) => {
      return new Databases(client)
        .maintenances("ad-1234-5678-9012")
        .all({ page: 2 });
    },
  );
});

describe("Maintenances#show", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/maintenance/000000000000000000000501",
    {},
    null,
    (client) => {
      return new Databases(client)
        .maintenances("ad-1234-5678-9012")
        .show("000000000000000000000501");
    },
  );
});
