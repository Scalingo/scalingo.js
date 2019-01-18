import {testGetter} from '../utils/http.js'
import Metrics from '../../src/Metrics'
import {Client} from '../../src'
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {expect} from 'chai'

describe("Metrics#types", () => {
  testGetter("https://api.scalingo.com/v1/features/metrics", "metrics", (client) => {
    return new Metrics(client).types()
  })
})

describe("Metrics#get", () => {
  describe("with a simple request", () => {
    testGetter("https://api.scalingo.com/v1/apps/toto/stats/router", null, (client) => {
      return new Metrics(client).get("toto", "router")
    })
  })

  describe("When requesting container metrics", () => {
    testGetter("https://api.scalingo.com/v1/apps/toto/stats/cpu/web/1", null, (client) => {
      return new Metrics(client).get("toto", "cpu", {containerIndex: 1, containerType: "web"})
    })
  })

  describe("When having complex queries", () => {
    it("should pass them as query parameters", async () => {
      let client = new Client("toto")
      let mock = new MockAdapter(axios)
      mock.onGet("https://api.scalingo.com/v1/apps/toto/stats/cpu/web", {params: {since: 32}}).reply(200, {
        test: "value",
      })

      let result = await new Metrics(client).get("toto", "cpu", {containerType: "web", since: 32})
      expect(result).to.deep.eq({test: "value"})
    })
  })
})
