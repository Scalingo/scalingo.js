import {Client} from "../index";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {expect} from "chai";
import {APIError} from "../errors";

export function testEventsGetter(url, opts, build) {
  describe("Pagination", () => {
    it('calls the API and return the data when there is no errors', async () => {
      let client = new Client("test-token")
      let mock = new MockAdapter(axios)
      let response = {toto: "tata"}
      mock.onGet(url, {params: opts}).reply(200, response)
      let result = await build(client)
      expect(result).to.deep.eq(response)
    })
    
    it('returns an error when the API fails', async () => {
      let client = new Client("test-token")
      let mock = new MockAdapter(axios)
      mock.onGet(url, {params: opts}).reply(404, {
        error: "not found"
      })
      try {
        await build(client)
      } catch (error) {
        expect(error).to.be.an.instanceOf(APIError)
        expect(error.status).to.eq(404)
        return
      }
      expect.fail("The method did not throw")
    })
  })
}
