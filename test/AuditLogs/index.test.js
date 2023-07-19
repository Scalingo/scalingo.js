import AuditLogs from "../../src/AuditLogs";
import { testGetter } from "../utils/http";

describe("AuditLogs#show", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/tata/audit_logs/541067ec736f7504a5110000",
    null,
    null,
    (client) => {
      return new AuditLogs(client).show("tata", "541067ec736f7504a5110000");
    },
  );
});
