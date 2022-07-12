import HDSContacts from "../../src/HDSContacts";
import { testPut } from "../utils/http";

describe("HDSContacts#update", () => {
  testPut(
    "https://api.osc-fr1.scalingo.com/v1/apps/test/hds_contact",
    {
      hds_contact: {
        name: "Médecin",
        phoneNumber: "0600000000",
        addressLine1: "23 rue du bois",
        addressCountry: "France",
      },
    },
    "hds_contact",
    (client) => {
      return new HDSContacts(client).update("test", {
        name: "Médecin",
        phoneNumber: "0600000000",
        addressLine1: "23 rue du bois",
        addressCountry: "France",
      });
    }
  );
});
