import {testDelete, testGetter, testPost, testUpdate} from "../utils/http"
import Addons from "../../src/Addons"
import sinon from "sinon";
import MockAdapter from "axios-mock-adapter";
import axios from "axios"
import {Client} from '../../src'
import {expect} from "chai"
import {APIError} from "../../src/errors";

describe("Addons#for", () => {
  testGetter("https://api.scalingo.com/v1/apps/toto/addons", "addons", (client) => {
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
  testGetter("https://api.scalingo.com/v1/addon_categories", "addon_categories", (client) => {
    return new Addons(client).listCategories()
  })
});

describe('Addons#listProviders', () => {
  it('Should return the category', async () => {
    let mock = new MockAdapter(axios)
    let client = new Client("test-token")
    
    mock.onGet("https://api.scalingo.com/v1/addon_providers?category_id=1234", )
      .reply(200, {addon_providers: {data: "value"}})
    let result = await client.Addons.listProviders("1234")
    expect(result).to.deep.eq({data: "value"})
  })
  
  it('Should return an error', async () => {
    let mock = new MockAdapter(axios)
    let client = new Client("test-token")
  
    mock.onGet("https://api.scalingo.com/v1/addon_providers?category_id=1234", )
      .reply(404, {error: "not found"})
    try {
      await client.Addons.listProviders("1234")
    } catch (e) {
      expect(e.status).to.eq(404)
      expect(e.data.error).to.eq("not found")
    }
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
