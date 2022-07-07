import HDSContacts from "../../src/HDSContacts";
import { testPut } from "../utils/http";

describe("HDSContacts#updateHDSContact", () => {
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
      return new HDSContacts(client).updateHDSContact("test", {
        name: "Médecin",
        phoneNumber: "0600000000",
        addressLine1: "23 rue du bois",
        addressCountry: "France",
      });
    }
  );
});
