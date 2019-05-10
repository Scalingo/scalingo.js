import Listener from '../../src/Deployments/listener.js'
import {testGetter} from '../utils/http.js'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {Client} from '../../src'
import Apps from '../../src/Apps'
import {expect} from 'chai'
import sinon from 'sinon'

describe('App#all', () => {
  testGetter("https://api.scalingo.com/v1/apps", "apps", (client) => {
    return new Apps(client).all()
  })
})

describe('App#find', () => {
  testGetter("https://api.scalingo.com/v1/apps/toto", "app", (client) => {
    return new Apps(client).find('toto')
  })
})

describe('App#deploymentListener', () => {
  it('should instantiate the Listener', async () => {
    let client = new Apps(new Client("test-token"))
    let mock = new MockAdapter(axios)

    mock.onGet(`https://api.scalingo.com/v1/apps/testApp`).reply(200, {
      app: {
        links: {
          deployments_stream: "wss://test.dev/apps/testApp"
        }
      }
    })

    // Prevent the listener to really open the connection
    let stub = sinon.stub(Listener.prototype, "_start")
    let listener = await client.deploymentListener("testApp")
    expect(listener._url).to.eq("wss://test.dev/apps/testApp")
    stub.restore()
  })
})
