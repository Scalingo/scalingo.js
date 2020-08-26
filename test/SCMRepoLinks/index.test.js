import { testDelete, testGetter, testPost, testUpdate } from "../utils/http";
import SCMRepoLinks from "../../src/SCMRepoLinks";

describe("SCMRepoLinks#find", () => {
  testGetter(
    "https://api.scalingo.com/v1/apps/biniou/scm_repo_link",
    null,
    "scm_repo_link",
    (client) => {
      return new SCMRepoLinks(client).find("biniou");
    }
  );
});

describe("SCMRepoLinks#create", () => {
  describe("With a simple request", () => {
    const opts = {
      source: "https://github.com/Scalingo/sample-go-martini",
      branch: "master",
      auto_deploy_enabled: true,
      deploy_review_apps_enabled: true,
      delete_on_close_enabled: true,
      hours_before_delete_on_close: 0,
    };
    testPost(
      "https://api.scalingo.com/v1/apps/biniou/scm_repo_link",
      null,
      { scm_repo_link: opts },
      "scm_repo_link",
      (client) => {
        return new SCMRepoLinks(client).create("biniou", opts);
      }
    );
  });
});

describe("SCMRepoLinks#update", () => {
  const opts = { branch: "prod", auto_deploy_enabled: true };
  testUpdate(
    "https://api.scalingo.com/v1/apps/biniou/scm_repo_link",
    { scm_repo_link: opts },
    "scm_repo_link",
    (client) => {
      return new SCMRepoLinks(client).update("biniou", opts);
    }
  );
});

describe("SCMRepoLinks#destroy", () => {
  testDelete(
    "https://api.scalingo.com/v1/apps/biniou/scm_repo_link",
    (client) => {
      return new SCMRepoLinks(client).destroy("biniou");
    }
  );
});

describe("SCMRepoLinks#manualDeploy", () => {
  testPost(
    "https://api.scalingo.com/v1/apps/biniou/scm_repo_link/manual_deploy",
    null,
    { branch: "master" },
    "deployment",
    (client) => {
      return new SCMRepoLinks(client).manualDeploy("biniou", "master");
    }
  );
});

describe("SCMRepoLinks#manualReviewApp", () => {
  testPost(
    "https://api.scalingo.com/v1/apps/biniou/scm_repo_link/manual_review_app",
    null,
    { pull_request_id: 42 },
    "review_app",
    (client) => {
      return new SCMRepoLinks(client).manualReviewApp("biniou", 42);
    }
  );
});

describe("SCMRepoLinks#branches", () => {
  testGetter(
    "https://api.scalingo.com/v1/apps/biniou/scm_repo_link/branches",
    null,
    "branches",
    (client) => {
      return new SCMRepoLinks(client).branches("biniou");
    }
  );
});

describe("SCMRepoLinks#pulls", () => {
  testGetter(
    "https://api.scalingo.com/v1/apps/biniou/scm_repo_link/pulls",
    null,
    "pulls",
    (client) => {
      return new SCMRepoLinks(client).pulls("biniou");
    }
  );
});
