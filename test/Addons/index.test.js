import {testDelete, testGetter, testPost, testUpdate} from "../utils/http"
import Addons from "../../src/Addons"
import sinon from "sinon";
import MockAdapter from "axios-mock-adapter";
import axios from "axios"
import {Client} from '../../src'
import {expect} from "chai"
import {APIError} from "../../src/errors";

describe("Addons#for", () => {
  testGetter("https://api.scalingo.com/v1/apps/toto/addons", null, "addons", (client) => {
    return new Addons(client).for("toto")
  })
})

describe("Addons#create", () => {
  testPost("https://api.scalingo.com/v1/apps/toto/addons",
    null, {addon: {plan_id: "test-plan", addon_provider_id: "test-provider"}}, "addon", (client) => {
    return new Addons(client).create("toto", "test-plan", "test-provider")
  })
})

describe('Addons#listCategories', () => {
  testGetter("https://api.scalingo.com/v1/addon_categories", {noAuth: true}, "addon_categories", (client) => {
    return new Addons(client).listCategories()
  })
});

describe('Addons#listProviders', () => {
  testGetter("https://api.scalingo.com/v1/addon_providers?category_id=1234", {noAuth: true}, "addon_providers", (client) => {
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

describe('Addons#sso', () => {
  testGetter("https://api.scalingo.com/v1/apps/toto/addons/titi/sso", null, "addon", (client) => {
    return new Addons(client).sso('toto', 'titi')
  })
})

describe('Addons#getAddon', () => {
  testGetter("https://api.scalingo.com/v1/apps/toto/addons/tata", null, "addon", (client) => {
    return new Addons(client).getAddon('toto', 'tata')
  })
})
