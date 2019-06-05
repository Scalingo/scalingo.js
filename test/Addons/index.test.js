import {testDelete, testGetter, testPost, testUpdate} from "../utils/http"
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

describe('Addons#update', () => {
  testUpdate("https://api.scalingo.com/v1/apps/toto/addons/54100930736f7563d5030000", {addon: {plan_id: "54100930736f7563d5030000"}}, "addon", (client) => {
    return new Addons(client).update("toto", "54100930736f7563d5030000", {plan_id: "54100930736f7563d5030000"})
  })
})

describe('Addons#destroy', () => {
  testDelete("https://api.scalingo.com/v1/apps/toto/addons/54100930736f7563d5030000", (client) => {
    return new Addons(client).destroy('toto', '54100930736f7563d5030000')
  })
})
