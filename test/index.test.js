import {expect} from 'chai'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {clientFromToken, Client} from  "../src/"

describe('clientFromToken', () => {
  it('call the auth API and create a new token', async () => {
    let mock = new MockAdapter(axios);
     mock.onPost('https://auth.scalingo.com/v1/tokens/exchange').reply(200, {
      "token": "jwt-test"
     });

    let result = await clientFromToken("tk-us-test")
    expect(result).to.not.be.null
    expect(result._token).to.eq("jwt-test")
    expect(mock.history.post[0].auth.password).to.eq("tk-us-test")
  })
})

describe("new Client", () => {
  it("should use correct defaults", () => {
    let client = new Client("test")
    expect(client._token).to.eq("test")
    expect(client._apiUrl).to.eq("https://api.scalingo.com")
    expect(client._authApiUrl).to.eq("https://auth.scalingo.com")
  })

  it("should apply correct opts", () => {
    let client = new Client("test", {
      apiUrl: "https://api.test.com",
      authApiUrl: "https://auth.test.com"
    })
    expect(client._apiUrl).to.eq("https://api.test.com")
    expect(client._authApiUrl).to.eq("https://auth.test.com")
  })
})
