import TransferInvitations from "../../src/Projects/TransferInvitations/index";
import { testGetter, testPost, testUpdate } from "../utils/http";

const projectId = "project-123";

describe("TransferInvitations#all", () => {
  testGetter(
    `https://api.osc-fr1.scalingo.com/v1/projects/${projectId}/transfer_invitations`,
    null,
    "transfer_invitations",
    (client) => {
      return new TransferInvitations(client, projectId).all();
    },
  );
});

describe("TransferInvitations#all with status filter", () => {
  testGetter(
    `https://api.osc-fr1.scalingo.com/v1/projects/${projectId}/transfer_invitations?status=pending`,
    null,
    "transfer_invitations",
    (client) => {
      return new TransferInvitations(client, projectId).all({
        status: "pending",
      });
    },
  );
});

describe("TransferInvitations#all with all status", () => {
  testGetter(
    `https://api.osc-fr1.scalingo.com/v1/projects/${projectId}/transfer_invitations?status=all`,
    null,
    "transfer_invitations",
    (client) => {
      return new TransferInvitations(client, projectId).all({
        status: "all",
      });
    },
  );
});

describe("TransferInvitations#find", () => {
  testGetter(
    `https://api.osc-fr1.scalingo.com/v1/projects/${projectId}/transfer_invitations/invitation-id`,
    null,
    "transfer_invitation",
    (client) => {
      return new TransferInvitations(client, projectId).find("invitation-id");
    },
  );
});

describe("TransferInvitations#create", () => {
  testPost(
    `https://api.osc-fr1.scalingo.com/v1/projects/${projectId}/transfer_invitations`,
    null,
    {
      transfer_invitation: {
        invited_user_id: "user-456",
      },
    },
    "transfer_invitation",
    (client) => {
      return new TransferInvitations(client, projectId).create({
        invited_user_id: "user-456",
      });
    },
  );
});

describe("TransferInvitations#update", () => {
  testUpdate(
    `https://api.osc-fr1.scalingo.com/v1/projects/${projectId}/transfer_invitations/invitation-id`,
    {
      transfer_invitation: {
        status: "canceled",
      },
    },
    "transfer_invitation",
    (client) => {
      return new TransferInvitations(client, projectId).update(
        "invitation-id",
        {
          status: "canceled",
        },
      );
    },
  );
});

describe("TransferInvitations#accept", () => {
  testPost(
    `https://api.osc-fr1.scalingo.com/v1/projects/${projectId}/transfer_invitations/invitation-id/accept`,
    null,
    {},
    "transfer_invitation",
    (client) => {
      return new TransferInvitations(client, projectId).accept(
        "invitation-id",
      );
    },
  );
});

describe("TransferInvitations#decline", () => {
  testPost(
    `https://api.osc-fr1.scalingo.com/v1/projects/${projectId}/transfer_invitations/invitation-id/decline`,
    null,
    {},
    "transfer_invitation",
    (client) => {
      return new TransferInvitations(client, projectId).decline(
        "invitation-id",
      );
    },
  );
});
