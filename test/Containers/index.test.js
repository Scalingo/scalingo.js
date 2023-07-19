import { expect } from "chai";
import { Factory } from "rosie";

import Containers from "../../src/Containers";
import { testGetter, testPost } from "../utils/http";
import "../factories";

describe("Containers#for", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/toto/containers",
    null,
    "containers",
    (client) => {
      return new Containers(client).for("toto");
    },
  );
});

describe("Containers#processes", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/apps/toto/ps",
    null,
    "containers",
    (client) => {
      return new Containers(client).processes("toto");
    },
  );
});

describe("Containers#run", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/apps/toto/run",
    null,
    { command: "echo test", size: "M" },
    "container",
    (client) => {
      return new Containers(client).run("toto", {
        command: "echo test",
        size: "M",
      });
    },
  );
});

describe("Containers#stop", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/apps/toto/containers/one-off-ish/stop",
    null,
    null,
    null,
    (client) => {
      return new Containers(client).stop("toto", "one-off-ish");
    },
  );
});

describe("Containers#scale", () => {
  const postOpts = {
    location:
      "https://api.osc-fr1.scalingo.com/v1/apps/toto/operations/54100930736f7563d5030000",
  };
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/apps/toto/scale",
    postOpts,
    { containers: [{ name: "web", amount: 2, size: "M" }] },
    "containers",
    (client, opts) => {
      if (opts.shouldFail) {
        return new Containers(client).scale("toto", [
          { name: "web", amount: 2, size: "M" },
        ]);
      }
      const operation = Factory.build("operation");
      opts.axios.onGet(postOpts.location).reply(200, { operation: operation });
      return new Promise((resolve, reject) => {
        const promise = new Containers(client).scale("toto", [
          { name: "web", amount: 2, size: "M" },
        ]);
        promise
          .then((data) => {
            expect(data.operation.id).to.eq(operation.id);
            resolve(data.formation);
          })
          .catch(reject);
      });
    },
  );
});

describe("Container#availableSizes", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/features/container_sizes",
    null,
    "container_sizes",
    (client) => {
      return new Containers(client).availableSizes();
    },
  );
});

describe("Container#restart", () => {
  const postOpts = {
    emptyResponseBody: true,
    location:
      "https://api.osc-fr1.scalingo.com/v1/apps/toto/operations/54100930736f7563d5030000",
  };
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/apps/toto/restart",
    postOpts,
    { scope: ["web"] },
    "scope",
    (client, opts) => {
      if (opts.shouldFail) {
        return new Containers(client).restart("toto", ["web"]);
      }
      const operation = Factory.build("operation");
      opts.axios.onGet(postOpts.location).reply(200, { operation: operation });
      return new Promise((resolve, reject) => {
        new Containers(client)
          .restart("toto", ["web"])
          .then((data) => {
            expect(data.id).to.eq(operation.id);
            resolve(data);
          })
          .catch(reject);
      });
    },
  );
});
