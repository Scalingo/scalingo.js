import Projects from "../../src/Projects";
import { testGetter, testPost, testUpdate } from "../utils/http";

describe("Projects#all", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/projects",
    null,
    "projects",
    (client) => {
      return new Projects(client).all();
    },
  );
});

describe("Projects#find", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/projects/project-id",
    null,
    "project",
    (client) => {
      return new Projects(client).find("project-id");
    },
  );
});

describe("Projects#create", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/projects",
    null,
    {
      project: {
        name: "test-project",
        default: false,
      },
    },
    "project",
    (client) => {
      return new Projects(client).create({
        name: "test-project",
        default: false,
      });
    },
  );
});

describe("Projects#update", () => {
  testUpdate(
    "https://api.osc-fr1.scalingo.com/v1/projects/project-id",
    {
      project: {
        name: "new-name",
        default: true,
      },
    },
    "project",
    (client) => {
      return new Projects(client).update("project-id", {
        name: "new-name",
        default: true,
      });
    },
  );
});

describe("Projects#eligibleNewOwners", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/projects/project-id/eligible_new_owners",
    null,
    "eligible_new_owners",
    (client) => {
      return new Projects(client).eligibleNewOwners("project-id");
    },
  );
});
