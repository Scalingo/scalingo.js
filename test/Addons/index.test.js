import {testGetter} from "../utils/http"
import Addons from "../../src/Addons"

describe("Addons#for", () => {
  testGetter("https://api.scalingo.com/v1/apps/toto/addons", "addons", (client) => {
    return new Addons(client).for("toto")
  })
})
