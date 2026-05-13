import Databases from "../../../src/Databases";
import { testGetter, testPost } from "../../utils/http";

describe("Backups#all", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/backups",
    {},
    "database_backups",
    (client) => {
      return new Databases(client).backups("ad-1234-5678-9012").all();
    },
  );
});

describe("Backups#create", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/backups",
    null,
    {},
    "database_backup",
    (client) => {
      return new Databases(client).backups("ad-1234-5678-9012").create();
    },
  );
});

describe("Backups#show", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/backups/backup-123",
    {},
    "database_backup",
    (client) => {
      return new Databases(client)
        .backups("ad-1234-5678-9012")
        .show("backup-123");
    },
  );
});

describe("Backups#archiveUrl", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/backups/backup-123/archive",
    {},
    "download_url",
    (client) => {
      return new Databases(client)
        .backups("ad-1234-5678-9012")
        .archiveUrl("backup-123");
    },
  );
});

describe("Backups#restore", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/api/databases/ad-1234-5678-9012/backups/backup-123/restore",
    {},
    {},
    undefined,
    (client) => {
      return new Databases(client)
        .backups("ad-1234-5678-9012")
        .restore("backup-123");
    },
  );
});
