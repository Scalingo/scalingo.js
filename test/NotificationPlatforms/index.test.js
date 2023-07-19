import NotificationPlatforms from "../../src/NotificationPlatforms";
import { testGetter } from "../utils/http";

describe("NotificationPlatforms#list", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/notification_platforms",
    { noAuth: true },
    "notification_platforms",
    (client) => {
      return new NotificationPlatforms(client).list();
    },
  );
});
