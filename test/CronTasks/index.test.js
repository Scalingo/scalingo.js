import CronTasks from "../../src/CronTasks";
import { testGetter } from "../utils/http";

describe("CronTasks#for", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/toto/cron_tasks",
    null,
    null,
    (client) => {
      return new CronTasks(client).for("toto");
    }
  );
});
