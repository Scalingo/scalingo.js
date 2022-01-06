import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";

import { Client } from "../../src";
import { APIError } from "../../src/errors";

export function testGetter(url, opts, prefix, build) {
  it("calls the API and return the data when there is no errors", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);
    let response = { test: "value" };
    if (prefix !== null) {
      response = { [prefix]: response };
    }
    mock.onGet(url).reply(200, response);
    const result = await build(client);
    expect(result).to.deep.eq({ test: "value" });
    if (opts && opts["noAuth"]) {
      expect(mock.history.get[0].headers.Authorization).to.be.undefined;
    } else {
      expect(mock.history.get[0].headers.Authorization).to.eq(
        "Bearer test-token"
      );
    }
  });

  it("returns an error when the API fails", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);
    mock.onGet(url).reply(404, {
      error: "not found",
    });
    try {
      await build(client);
    } catch (error) {
      expect(error).to.be.an.instanceOf(APIError);
      expect(error.status).to.eq(404);
      return;
    }
    expect.fail("The method did not throw");
  });
}

export function testPost(url, opts, body, prefix, build) {
  it("calls the API and return the data when there is no errors", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);
    const resultValue = { data: "value" };

    const headers = {};
    let respBody = resultValue;

    if (prefix) {
      respBody = {
        [prefix]: resultValue,
      };
    }

    if (opts && opts["location"]) {
      headers["location"] = opts["location"];
    }

    if (opts && opts["emptyResponseBody"]) {
      respBody = null;
    }

    mock.onPost(url).reply(200, respBody, headers);

    const result = await build(client, { shouldFail: false, axios: mock });
    if (!opts || !opts["emptyResponseBody"]) {
      expect(result).to.deep.eq(resultValue);
    }
    expect(mock.history.post[0].headers.Authorization).to.eq(
      "Bearer test-token"
    );
    if (body) {
      expect(JSON.parse(mock.history.post[0].data)).to.deep.eq(body);
    }
  });

  it("returns an error when the API fails", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);
    mock.onPost(url).reply(404, {
      error: "not found",
    });
    try {
      await build(client, { shouldFail: true, axios: mock });
    } catch (error) {
      expect(error).to.be.an.instanceOf(APIError);
      expect(error.status).to.eq(404);
      return;
    }
    expect.fail("The method did not throw");
  });
}

export function testDelete(url, build) {
  it("calls the API and return the data when there is no errors", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);
    mock.onDelete(url).reply(204);
    await build(client);
    expect(mock.history.delete[0].headers.Authorization).to.eq(
      "Bearer test-token"
    );
  });

  it("returns an error when the API fails", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);
    mock.onDelete(url).reply(404, {
      error: "not found",
    });
    try {
      await build(client);
    } catch (error) {
      expect(error).to.be.an.instanceOf(APIError);
      expect(error.status).to.eq(404);
      return;
    }
    expect.fail("The method did not throw");
  });
}

export function testUpdate(url, body, prefix, build) {
  it("calls the API and return the data when there is no errors", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);
    mock.onPatch(url).reply(200, {
      [prefix]: { data: "value" },
    });
    const result = await build(client);
    expect(result).to.deep.eq({ data: "value" });
    expect(mock.history.patch[0].headers.Authorization).to.eq(
      "Bearer test-token"
    );

    const parsedBody = mock.history.patch[0].data
      ? JSON.parse(mock.history.patch[0].data)
      : null;

    expect(parsedBody).to.deep.eq(body);
  });

  it("returns an error when the API fails", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);
    mock.onPost(url).reply(404, {
      error: "not found",
    });
    try {
      await build(client);
    } catch (error) {
      expect(error).to.be.an.instanceOf(APIError);
      expect(error.status).to.eq(404);
      return;
    }
    expect.fail("The method did not throw");
  });
}

export function testPut(url, body, prefix, build) {
  it("calls the API and return the data when there is no errors", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);
    mock.onPut(url).reply(200, {
      [prefix]: { data: "value" },
    });
    const result = await build(client);
    expect(result).to.deep.eq({ data: "value" });
    expect(mock.history.put[0].headers.Authorization).to.eq(
      "Bearer test-token"
    );
    expect(JSON.parse(mock.history.put[0].data)).to.deep.eq(body);
  });

  it("returns an error when the API fails", async () => {
    const client = new Client("test-token");
    const mock = new MockAdapter(axios);
    mock.onPost(url).reply(404, {
      error: "not found",
    });
    try {
      await build(client);
    } catch (error) {
      expect(error).to.be.an.instanceOf(APIError);
      expect(error.status).to.eq(404);
      return;
    }
    expect.fail("The method did not throw");
  });
}

export function testParamsGetter(url, opts, prefix, build) {
  describe("ParamsGetter", () => {
    it("calls the API and return the data when there is no errors", async () => {
      const client = new Client("test-token");
      const mock = new MockAdapter(axios);
      let response = { toto: "tata" };
      if (prefix !== null) {
        response = { [prefix]: response };
      }
      mock.onGet(url, { params: opts }).reply(200, response);
      const result = await build(client);
      expect(result).to.deep.eq({ toto: "tata" });
    });

    it("returns an error when the API fails", async () => {
      const client = new Client("test-token");
      const mock = new MockAdapter(axios);
      mock.onGet(url, { params: opts }).reply(404, {
        error: "not found",
      });
      try {
        await build(client);
      } catch (error) {
        expect(error).to.be.an.instanceOf(APIError);
        expect(error.status).to.eq(404);
        return;
      }
      expect.fail("The method did not throw");
    });
  });
}
