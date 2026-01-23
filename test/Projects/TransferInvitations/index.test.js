import Projects from "../../../src/Projects";
import { testGetter, testPost } from "../../utils/http";

describe("TransferInvitations#all", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/projects/project-id/transfer_invitations",
    null,
    "transfer_invitations",
    (client) => {
      return new Projects(client).transferInvitations("project-id").all();
    },
  );
});

describe("TransferInvitations#all with status filter", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/projects/project-id/transfer_invitations",
    null,
    "transfer_invitations",
    (client) => {
      return new Projects(client)
        .transferInvitations("project-id")
        .all({ status: "pending" });
    },
  );
});

describe("TransferInvitations#find", () => {
  testGetter(
    "https://api.osc-fr1.scalingo.com/v1/projects/project-id/transfer_invitations/invitation-id",
    null,
    "transfer_invitation",
    (client) => {
      return new Projects(client)
        .transferInvitations("project-id")
        .find("invitation-id");
    },
  );
});

describe("TransferInvitations#create", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/projects/project-id/transfer_invitations",
    null,
    {
      transfer_invitation: {
        invited_user_id: "user-id",
      },
    },
    "transfer_invitation",
    (client) => {
      return new Projects(client).transferInvitations("project-id").create({
        invited_user_id: "user-id",
      });
    },
  );
});

describe("TransferInvitations#cancel", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/projects/project-id/transfer_invitations/invitation-id/cancel",
    null,
    {},
    "transfer_invitation",
    (client) => {
      return new Projects(client)
        .transferInvitations("project-id")
        .cancel("invitation-id");
    },
  );
});

describe("TransferInvitations#accept", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/projects/project-id/transfer_invitations/invitation-id/accept",
    null,
    {},
    "transfer_invitation",
    (client) => {
      return new Projects(client)
        .transferInvitations("project-id")
        .accept("invitation-id");
    },
  );
});

describe("TransferInvitations#decline", () => {
  testPost(
    "https://api.osc-fr1.scalingo.com/v1/projects/project-id/transfer_invitations/invitation-id/decline",
    null,
    {},
    "transfer_invitation",
    (client) => {
      return new Projects(client)
        .transferInvitations("project-id")
        .decline("invitation-id");
    },
  );
});
