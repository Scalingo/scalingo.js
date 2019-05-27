import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {Client} from '../../src'
import Apps from '../../src/Apps'
import LogsListener from '../../src/Logs/listener'
import sinon from 'sinon'

describe("Logs#for", () => {
  var logsURLMock;

  beforeEach(() => {
    logsURLMock = sinon.stub(Apps.prototype, "logsURL")
  })

  afterEach(() => {
    logsURLMock.restore()
  })

  it("should call the correct URL if there are no opts", async () => {
    logsURLMock.withArgs("testApp").resolves("https://logs.scalingo.com/apps?token=1234")

    let client = new Client("test-token")
    let mock = new MockAdapter(axios)

    mock.onGet("https://logs.scalingo.com/apps?token=1234&stream=false").reply(200, "test-log")

    let result = await client.Logs.for("testApp")
    expect(result).to.eq("test-log")
  })

  it("should call the correct URL when there are opts", async () => {
    logsURLMock.withArgs("testApp").resolves("https://logs.scalingo.com/apps?token=1234")

    let client = new Client("test-token")
    let mock = new MockAdapter(axios)

    mock.onGet("https://logs.scalingo.com/apps?token=1234&stream=false&n=123").reply(200, "test-log")

    let result = await client.Logs.for("testApp", {count: 123})
    expect(result).to.eq("test-log")
  })

  it("should return an error if the API is returning an error", async () => {
    logsURLMock.withArgs("testApp").rejects("Test")
    let client = new Client("test-token")

    var error

    try {
      await client.Logs.for("testApp")
    } catch(e) {
      error = e
    }
    expect(error.toString()).to.eq("Test")
  })
})

describe("listenerFor", () => {
  var logsURLMock;
  var listenerStartStub;

  beforeEach(() => {
    logsURLMock = sinon.stub(Apps.prototype, "logsURL")
    // Mock the _start method of the listner to prevent the Listener from really open connection
    listenerStartStub = sinon.stub(LogsListener.prototype, "_start")
  })

  afterEach(() => {
    logsURLMock.restore()
    listenerStartStub.restore()
  })

  it("should return a listener for the app logs", async () => {
    logsURLMock.withArgs("testApp").resolves("https://logs.scalingo.com/apps?token=1234")

    let client = new Client("test-token")
    let result = await client.Logs.listenerFor("testApp")

    expect(result._url).to.eq("https://logs.scalingo.com/apps?token=1234&stream=true")
  })
})
