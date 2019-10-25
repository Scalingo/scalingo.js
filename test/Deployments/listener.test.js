import Listener from '../../src/Deployments/listener.js'
import sinon from 'sinon'
import { expect } from 'chai'

describe('Listener', () => {
  let stub
  let listener
  beforeEach(() => {
    const api = { _token: 'testToken' }
    // Prevent the listener to really open the connection
    stub = sinon.stub(Listener.prototype, '_start')
    listener = new Listener(api, 'wss://test.fr')
  })

  afterEach(() => {
    stub.restore()
  })

  describe('Listener#_auth', () => {
    it('should send the token', () => {
      const ws = {
        send: sinon.stub(),
      }
      listener._ws = ws

      listener._auth()
      expect(ws.send.called).to.be.true
      expect(ws.send.getCall(0).args[0]).to.eq(
        `{"type":"auth","data":{"token":"testToken"}}`,
      )
    })
  })

  describe('Listener#close', () => {
    it('should close the connection', () => {
      const stub = sinon.stub()
      listener._ws = {
        close: stub,
      }
      listener.close()
      expect(stub.called).to.be.true
      expect(listener._ws).to.be.null
    })
  })

  describe('Listener#onMessage', () => {
    it("shoult call the correct callback when we get a 'new' message", () => {
      const stub = sinon.stub()
      listener.onNew(stub)
      listener._onMessage({
        data: JSON.stringify({
          type: 'new',
          data: {
            deployment: '123e4567-e89b-12d3-a456-426655440000',
          },
        }),
      })

      expect(stub.called).to.be.true
      expect(stub.getCall(0).args[0]).to.deep.eq({
        deployment: '123e4567-e89b-12d3-a456-426655440000',
      })
    })

    it("should call the correct callback when we get a 'log' message", () => {
      const stub = sinon.stub()
      listener.onLog(stub)
      listener._onMessage({
        data: JSON.stringify({
          type: 'log',
          id: 'test-id',
          data: {
            content: 'Hey !',
          },
        }),
      })

      expect(stub.called).to.be.true
      expect(stub.getCall(0).args[0]).to.deep.eq({
        id: 'test-id',
        content: 'Hey !',
      })
    })

    it("should call the correct callback when we get a 'status' message", () => {
      const stub = sinon.stub()
      listener.onStatus(stub)
      listener._onMessage({
        data: JSON.stringify({
          type: 'status',
          id: 'test-id',
          data: {
            status: 'build-error',
          },
        }),
      })

      expect(stub.called).to.be.true
      expect(stub.getCall(0).args[0]).to.deep.eq({
        id: 'test-id',
        status: 'build-error',
      })
    })
  })
})
