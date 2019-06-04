import '@babel/polyfill'
import {expect} from 'chai'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {Client} from '../../src'
import {APIError} from '../../src/errors'
import {Operation} from "../../src/Operations/utils";
import sinon from "sinon";

export function testGetter(url, prefix, build) {
  it('calls the API and return the data when there is no errors', async () => {
    let client = new Client("test-token")
    let mock = new MockAdapter(axios);
    let response = {test: "value"}
    if (prefix !== null) {
      response = {[prefix]: response}
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
    } catch (error) {
      expect(error).to.be.an.instanceOf(APIError)
      expect(error.status).to.eq(404)
      return
    }
    expect.fail("The method did not throw")
  })
}

export function testPost(url, opts, body, prefix, build) {
  it('calls the API and return the data when there is no errors', async () => {
    let client = new Client("test-token")
    let mock = new MockAdapter(axios);
    let resultValue = {data: 'value'}
    
    let headers = {}
    let respBody = resultValue
    
    if(prefix) {
      respBody = {
        [prefix]: resultValue
      }
    }
    
    if(opts && opts["location"]) {
      headers['location'] = opts['location']
    }
    
    if(opts && opts["emptyResponseBody"]) {
      respBody = null
    }
    
    mock.onPost(url).reply(200, respBody, headers)
    
    let result = await build(client, {shouldFail: false, axios: mock})
    if(!opts || !opts["emptyResponseBody"]) {
      expect(result).to.deep.eq(resultValue)
    }
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
      await build(client, {shouldFail: true, axios: mock})
    } catch (error) {
      expect(error).to.be.an.instanceOf(APIError)
      expect(error.status).to.eq(404)
      return
    }
    expect.fail("The method did not throw")
  })
}

export function testDelete(url, build) {
  it('calls the API and return the data when there is no errors', async () => {
    let client = new Client("test-token");
    let mock = new MockAdapter(axios);
    mock.onDelete(url).reply(204);
    await build(client);
    expect(mock.history.delete[0].headers.Authorization).to.eq("Bearer test-token")
  });
  
  it('returns an error when the API fails', async () => {
    let client = new Client("test-token");
    let mock = new MockAdapter(axios);
    mock.onDelete(url).reply(404, {
      error: "not found"
    })
    try {
      await build(client)
    } catch (error) {
      expect(error).to.be.an.instanceOf(APIError);
      expect(error.status).to.eq(404);
      return;
    }
    expect.fail("The method did not throw");
  })
}

export function testUpdate(url, body, prefix, build) {
  it('calls the API and return the data when there is no errors', async () => {
    let client = new Client("test-token");
    let mock = new MockAdapter(axios);
    mock.onPatch(url).reply(200, {
      [prefix]: {data: "value"}
    });
    let result = await build(client);
    expect(result).to.deep.eq({data: "value"});
    expect(mock.history.patch[0].headers.Authorization).to.eq("Bearer test-token");
    expect(JSON.parse(mock.history.patch[0].data)).to.deep.eq(body);
  });
  
  it('returns an error when the API fails', async () => {
    let client = new Client("test-token");
    let mock = new MockAdapter(axios);
    mock.onPost(url).reply(404, {
      error: "not found"
    });
    try {
      await build(client)
    } catch (error) {
      expect(error).to.be.an.instanceOf(APIError);
      expect(error.status).to.eq(404);
      return
    }
    expect.fail("The method did not throw")
  });
}

export function testPut(url, body, prefix, build) {
  it('calls the API and return the data when there is no errors', async () => {
    let client = new Client("test-token");
    let mock = new MockAdapter(axios);
    mock.onPut(url).reply(200, {
      [prefix]: {data: "value"}
    });
    let result = await build(client);
    expect(result).to.deep.eq({data: "value"});
    expect(mock.history.put[0].headers.Authorization).to.eq("Bearer test-token");
    expect(JSON.parse(mock.history.put[0].data)).to.deep.eq(body);
  });
  
  it('returns an error when the API fails', async () => {
    let client = new Client("test-token");
    let mock = new MockAdapter(axios);
    mock.onPost(url).reply(404, {
      error: "not found"
    });
    try {
      await build(client)
    } catch (error) {
      expect(error).to.be.an.instanceOf(APIError);
      expect(error.status).to.eq(404);
      return
    }
    expect.fail("The method did not throw")
  });
}

