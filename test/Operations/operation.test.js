import Operations from '../../src/Operations'
import '@babel/polyfill'
import {expect} from 'chai'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {Client} from '../../src'
import {APIError} from '../../src/errors'
import sinon from "sinon"
import {Operation} from "../../src/Operations/utils";

describe("Operations#OperationClass", () => {
  it('Should call the refresh method and returns no error', async () => {
    let client = new Client("test-token")
    let mock = new MockAdapter(axios);
    let locationUri = "https://api.scalingo.com/v1/apps/toto/operations/54100930736f7563d5030000"
    
    let operationResponse = {
      operation: {
        id: "54100930736f7563d5030000",
        created_at: new Date(),
        finished_at: new Date(),
        status: "pending",
        type: "scale",
        error: null
      }
    }
    mock.onGet(locationUri).reply(200, operationResponse)
    
    let operation = new Operation(client, locationUri)
    await operation.refresh()
    expect(operation._id).to.eq(operationResponse.operation.id)
    expect(operation._status).to.eq('pending')
    expect(operation).to.be.instanceOf(Operation)
  })
  
  it('Should call the refresh method and returns an error', async () => {
    let client = new Client("test-token")
    let mock = new MockAdapter(axios);
    let locationUri = "https://api.scalingo.com/v1/apps/toto/operations/54100930736f7563d5030000"
  
    mock.onGet(locationUri).reply(404, {
      error: "not found"
    })
  
    let operation = new Operation(client, locationUri)
    try {
      await operation.refresh()
    } catch (error) {
      expect(error).to.be.instanceOf(APIError)
      expect(error.status).to.eq(404)
      expect(error.data).to.deep.eq({error: "not found"})
    }
  })
  
  it('Should call the wait method and returns with no error', async () => {
    let client = new Client("test-token")
    let mock = new MockAdapter(axios)
    let locationUri = "https://api.scalingo.com/v1/apps/toto/operations/54100930736f7563d5030000"
    
    let operationResponse = {
      operation: {
        id: "54100930736f7563d5030000",
        created_at: new Date(),
        finished_at: new Date(),
        status: "done",
        type: "scale",
        error: null
      }
    }
    mock.onGet(locationUri).reply(200, operationResponse)
    let operation = new Operation(client, locationUri)
    
    operation.setProperties({
      status: "pending",
    })
    
    expect(operation.status).to.eq("pending")
    operation.wait().then(() => {
      expect(operation.status).to.eq("done")
    })
  })
})
