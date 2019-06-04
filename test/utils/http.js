import '@babel/polyfill'
import {expect} from 'chai'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {Client} from '../../src'
import {APIError} from '../../src/errors'
import {Operation} from "../../src/Operations/utils";

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
    let resultValue
    
    if (opts && opts["operation"] === true && opts["location"]) {
      // If there is an operation, it will return the response and a location url
      mock.onPost(url).reply(200, {
        [prefix]: {data: "value"}
        // Set the location url inside the headers
      }, {location: opts["location"]})
      // Need to mock the "Operation" API call because of the Operation.refresh() method
      mock.onGet(opts["location"]).reply(200, {
        operation: {
          id: "54100930736f7563d5030000",
          created_at: new Date(),
          finished_at: new Date(),
          status: "pending",
          type: "scale",
          error: null
        }
      })
      // Init the Operation class
      let operation = new Operation(client, opts["location"])
      // Set properties inside the class
      await operation.refresh()
      resultValue = {
        formation: {data: "value"},
        operation: operation
      }
    } else {
      mock.onPost(url).reply(200, {
        [prefix]: {data: "value"}
      })
      resultValue = {data: "value"}
    }
    
    let result = await build(client)
    expect(result).to.deep.eq(resultValue)
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

