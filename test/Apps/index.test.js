import Listener from '../../src/Deployments/listener.js'
import { testGetter, testPost } from '../utils/http.js'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Client } from '../../src'
import Apps from '../../src/Apps'
import { expect } from 'chai'
import sinon from 'sinon'

describe('App#all', () => {
  testGetter('https://api.scalingo.com/v1/apps', null, 'apps', (client) => {
    return new Apps(client).all()
  })
})

describe('App#find', () => {
  testGetter('https://api.scalingo.com/v1/apps/toto', null, 'app', (client) => {
    return new Apps(client).find('toto')
  })
})

describe('App#deploymentListener', () => {
  it('should instantiate the Listener', async () => {
    let client = new Apps(new Client('test-token'))
    let mock = new MockAdapter(axios)

    mock.onGet(`https://api.scalingo.com/v1/apps/testApp`).reply(200, {
      app: {
        links: {
          deployments_stream: 'wss://test.dev/apps/testApp',
        },
      },
    })

    // Prevent the listener to really open the connection
    let stub = sinon.stub(Listener.prototype, '_start')
    let listener = await client.deploymentListener('testApp')
    expect(listener._url).to.eq('wss://test.dev/apps/testApp')
    stub.restore()
  })
})

describe('App#create', () => {
  describe('With a simple request', () => {
    testPost(
      'https://api.scalingo.com/v1/apps',
      null,
      { app: { name: 'testApp' } },
      'app',
      (client) => {
        return new Apps(client).create('testApp')
      },
    )
  })

  describe('Using custom params', () => {
    testPost(
      'https://api.scalingo.com/v1/apps',
      null,
      {
        app: {
          name: 'testApp',
          git_source: 'https://github.com/test/test',
          stack_id: 'abcdef',
          parent_id: 'abcdef1234',
        },
      },
      'app',
      (client) => {
        return new Apps(client).create('testApp', {
          git_source: 'https://github.com/test/test',
          stack_id: 'abcdef',
          parent_id: 'abcdef1234',
        })
      },
    )
  })

  describe('Using the dry_run param', async () => {
    let client = new Client('test-token')
    let mock = new MockAdapter(axios)

    mock.onPost('https://api.scalingo.com/v1/apps').reply(200, {
      app: {
        name: 'testApp',
      },
    })
    await new Apps(client).create('testApp', { dry_run: true })
    expect(mock.history.post[0].headers['X-Dry-Run']).to.eq('true')
  })
})

describe('App#logsURL', () => {
  testGetter(
    'https://api.scalingo.com/v1/apps/testApp/logs',
    null,
    'logs_url',
    (client) => {
      return new Apps(client).logsURL('testApp')
    },
  )
})
