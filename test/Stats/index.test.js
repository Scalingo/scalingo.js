import Stats from "../../src/Stats";
import { testGetter } from "../utils/http";

describe("Stats#referrals", () => {
  testGetter(
    "https://api.scalingo.com/v1/account/referrals/stats",
    null,
    "referral_stats",
    (client) => {
      return new Stats(client).referrals();
    }
  );
});
