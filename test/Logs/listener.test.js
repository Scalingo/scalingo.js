import {expect} from 'chai'
import sinon from 'sinon'
import LogsListener from '../../src/Logs/listener'

describe("_onMessage", () => {
  var startStub
  beforeEach(() => {
    startStub = sinon.stub(LogsListener.prototype, "_start")
  })

  afterEach(() => {
    startStub.restore()
  })

  it("should call the log callback if it exists", () => {
    let listener = new LogsListener()
    let spy = sinon.stub()
    listener.onLog(spy)

    listener._onMessage({
      data: `{"event": "log", "log": "test log"}`
    })

    expect(spy.firstCall.args[0]).to.eq("test log")
  })

  it("should not crash if the log callback is not defined", () => {
    let listener = new LogsListener()
    listener._onMessage({
      data: `{"event": "log", "log": "test log"}`
    })
  })
})
