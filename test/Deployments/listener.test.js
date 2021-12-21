import { expect } from "chai";
import sinon from "sinon";

import Listener from "../../src/Deployments/listener";

describe("Listener", () => {
  let stub;
  let listener;

  beforeEach(() => {
    const client = { _token: "testToken" };
    // Prevent the listener to really open the connection
    stub = sinon.stub(Listener.prototype, "start");
    listener = new Listener(client, "wss://test.fr");
  });

  afterEach(() => {
    stub.restore();
  });

  describe("Listener#performAuth", () => {
    it("should send the token", () => {
      const ws = {
        send: sinon.stub(),
      };
      listener.ws = ws;

      listener.performAuth();
      expect(ws.send.called).to.be.true;
      expect(ws.send.getCall(0).args[0]).to.eq(
        `{"type":"auth","data":{"token":"testToken"}}`
      );
    });
  });

  describe("Listener#close", () => {
    it("should close the connection", () => {
      const stub = sinon.stub();
      listener.ws = {
        close: stub,
      };
      listener.close();
      expect(stub.called).to.be.true;
      expect(listener.ws).to.be.null;
    });
  });

  describe("Listener#handleMessage", () => {
    it("shoult call the correct callback when we get a 'new' message", () => {
      const stub = sinon.stub();
      listener.onNew(stub);
      listener.handleMessage({
        data: JSON.stringify({
          type: "new",
          data: {
            deployment: "123e4567-e89b-12d3-a456-426655440000",
          },
        }),
      });

      expect(stub.called).to.be.true;
      expect(stub.getCall(0).args[0]).to.deep.eq({
        deployment: "123e4567-e89b-12d3-a456-426655440000",
      });
    });

    it("should call the correct callback when we get a 'log' message", () => {
      const stub = sinon.stub();
      listener.onLog(stub);
      listener.handleMessage({
        data: JSON.stringify({
          type: "log",
          id: "test-id",
          data: {
            content: "Hey !",
          },
        }),
      });

      expect(stub.called).to.be.true;
      expect(stub.getCall(0).args[0]).to.deep.eq({
        id: "test-id",
        content: "Hey !",
      });
    });

    it("should call the correct callback when we get a 'status' message", () => {
      const stub = sinon.stub();
      listener.onStatus(stub);
      listener.handleMessage({
        data: JSON.stringify({
          type: "status",
          id: "test-id",
          data: {
            status: "build-error",
          },
        }),
      });

      expect(stub.called).to.be.true;
      expect(stub.getCall(0).args[0]).to.deep.eq({
        id: "test-id",
        status: "build-error",
      });
    });
  });
});
