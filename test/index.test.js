import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";

import { version } from "../package.json";
import { clientFromToken, Client } from "../src/";

describe("clientFromToken", () => {
  it("call the auth API and create a new token", async () => {
    const mock = new MockAdapter(axios);
    mock.onPost("https://auth.scalingo.com/v1/tokens/exchange").reply(200, {
      token: "jwt-test",
    });

    const result = await clientFromToken("tk-us-test");
    expect(result).to.not.be.null;
    expect(result._token).to.eq("jwt-test");
    expect(mock.history.post[0].auth.password).to.eq("tk-us-test");
  });
});

describe("new Client", () => {
  it("should use correct defaults", () => {
    const client = new Client("test");
    expect(client._token).to.eq("test");
    expect(client._apiUrl).to.eq("https://api.osc-fr1.scalingo.com");
    expect(client._authApiUrl).to.eq("https://auth.scalingo.com");
    expect(client._billingApiUrl).to.eq("https://cashmachine.scalingo.com");
  });

  it("should apply correct opts", () => {
    const client = new Client("test", {
      apiUrl: "https://api.test.com",
      authApiUrl: "https://auth.test.com",
      billingApiUrl: "https://billing.test.com",
    });
    expect(client._apiUrl).to.eq("https://api.test.com");
    expect(client._authApiUrl).to.eq("https://auth.test.com");
    expect(client._billingApiUrl).to.eq("https://billing.test.com");
  });
});

describe("apiClient", () => {
  it("should set the user agent and the bearer token", () => {
    const client = new Client("totothetoken").apiClient();
    expect(client.defaults.headers).to.contains({
      Authorization: "Bearer totothetoken",
      "User-Agent": `Scalingo Javascript Client ${version}`,
    });
  });

  it("should just set the bearer token if opts.noUserAgent", () => {
    const client = new Client("totothetoken", {
      noUserAgent: true,
    }).apiClient();
    expect(client.defaults.headers).to.contains({
      Authorization: "Bearer totothetoken",
    });
  });
});

describe("billingApiClient", () => {
  it("should set the user agent and the bearer token", () => {
    const client = new Client("totothetoken").billingApiClient();
    expect(client.defaults.headers).to.contains({
      Authorization: "Bearer totothetoken",
      "User-Agent": `Scalingo Javascript Client ${version}`,
    });
  });

  it("should just set the bearer token if opts.noUserAgent", () => {
    const client = new Client("totothetoken", {
      noUserAgent: true,
    }).billingApiClient();
    expect(client.defaults.headers).to.contains({
      Authorization: "Bearer totothetoken",
    });
  });
});
