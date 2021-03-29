import { testGetter } from "../utils/http";
import AuditLogs from "../../src/AuditLogs";

describe("AuditLogs#show", () => {
  testGetter(
    "https://api.scalingo.com/v1/apps/tata/audit_logs/541067ec736f7504a5110000",
    null,
    null,
    (client) => {
      return new AuditLogs(client).show("tata", "541067ec736f7504a5110000");
    }
  );
});
