import 'babel-polyfill';
import {expect} from 'chai'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {Client} from '../../src'
import {APIError} from '../../src/errors'

export function testGetter(url, prefix, build) {
  it('calls the API and return the data when there is no errors', async () => {
    let client = new Client("test-token")
    let mock = new MockAdapter(axios);
    let response = {test: "value"}
    if(prefix !== null) {
      response = { [prefix]: response }
    }
    mock.onGet(url).reply(200, response)
    let result = await build(client)
    expect(result).to.deep.eq({test: "value"})
    expect(mock.history.get[0].headers.Authorization).to.eq("Bearer test-token")
  })

  it('returns an error when the API fails', async () => {
    let client = new Client("test-token")
    let mock = new MockAdapter(axios);
    mock.onGet(url).reply(404, {
      error: "not found"
    })
    try {
      await build(client)
    }catch(error) {
      expect(error).to.be.an.instanceOf(APIError)
      expect(error.status).to.eq(404)
      return
    }
    expect.fail("The method did not throw")
  })
}

export function testPost(url, body, prefix, build) {
  it('calls the API and return the data when there is no errors', async () => {
    let client = new Client("test-token")
    let mock = new MockAdapter(axios);
    mock.onPost(url).reply(200, {
      [prefix]: {data: "value"}
    })
    let result = await build(client)
    expect(result).to.deep.eq({data: "value"})
    expect(mock.history.post[0].headers.Authorization).to.eq("Bearer test-token")
    expect(JSON.parse(mock.history.post[0].data)).to.deep.eq(body)
  })

  it('returns an error when the API fails', async () => {
    let client = new Client("test-token")
    let mock = new MockAdapter(axios);
    mock.onPost(url).reply(404, {
      error: "not found"
    })
    try {
      await build(client)
    }catch(error) {
      expect(error).to.be.an.instanceOf(APIError)
      expect(error.status).to.eq(404)
      return
    }
    expect.fail("The method did not throw")
  })
}
