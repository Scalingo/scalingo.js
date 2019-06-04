import {testGetter, testPost} from "../utils/http"
import Addons from "../../src/Addons"

describe("Addons#for", () => {
  testGetter("https://api.scalingo.com/v1/apps/toto/addons", "addons", (client) => {
    return new Addons(client).for("toto")
  })
})

describe("Addons#create", () => {
  testPost("https://api.scalingo.com/v1/apps/toto/addons",
    null, {addon: {plan_id: "test", addon_provider_id: "test"}}, "addon", (client) => {
    return new Addons(client).create("toto", "test", "test")
  })
})

describe('Addons#listCategories', () => {
  testGetter("https://api.scalingo.com/v1/addon_categories", "addon_categories", (client) => {
    return new Addons(client).listCategories()
  })
});

describe('Addons#listProviders', () => {
  testGetter("https://api.scalingo.com/v1/addon_providers", "addon_providers", (client) => {
    return new Addons(client).listProviders("1234")
  })
});
