import { expect } from 'chai'
import sinon from 'sinon'
import LogsListener from '../../src/Logs/listener'

describe('_onMessage', () => {
  var startStub
  beforeEach(() => {
    startStub = sinon.stub(LogsListener.prototype, '_start')
  })

  afterEach(() => {
    startStub.restore()
  })

  it('should call the log callback if it exists', () => {
    let listener = new LogsListener(null, 'wss://test.fr')
    let spy = sinon.stub()
    listener.onLog(spy)

    listener._onMessage({
      data: `{"event": "log", "log": "test log"}`,
    })

    expect(spy.firstCall.args[0]).to.eq('test log')
  })

  it('should not crash if the log callback is not defined', () => {
    let listener = new LogsListener(null, 'wss://test.fr')
    listener._onMessage({
      data: `{"event": "log", "log": "test log"}`,
    })
  })

  describe('ws URL initialization', () => {
    let protocols = [
      {
        input: 'ws',
        output: 'ws',
      },
      {
        input: 'wss',
        output: 'wss',
      },
      {
        input: 'http',
        output: 'ws',
      },
      {
        input: 'https',
        output: 'wss',
      },
    ]

    for (let protocol of protocols) {
      it(`should work for ${protocol.input}`, () => {
        let listener = new LogsListener(null, `${protocol.input}://test.fr`)
        expect(listener._url).to.eq(`${protocol.output}://test.fr/`)
      })
    }
  })
})
