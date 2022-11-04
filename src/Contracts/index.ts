import { Client } from "..";
import { Contract } from "../models/auth/contracts";
import { unpackData } from "../utils";

export function requiredForPlatform(contract: Contract): boolean {
  return contract.required_for.includes("platform");
}

export function requiredForHDS(contract: Contract): boolean {
  return contract.required_for.includes("hds");
}

/**
 * Contract and Agreements API Client
 */
export default class Contracts {
  /** Scalingo API Client */
  _client: Client;

  /**
   * Create a new "thematic" client
   * @param client Scalingo API Client
   */
  constructor(client: Client) {
    this._client = client;
  }

  list(): Promise<Contract[]> {
    return unpackData(
      this._client
        .authApiClient()
        .get("/contracts", { headers: { Accept: "application/json" } }),
      "contracts"
    );
  }

  history(): Promise<Contract[]> {
    return unpackData(
      this._client
        .authApiClient()
        .get("/contracts/history", { headers: { Accept: "application/json" } }),
      "contracts"
    );
  }

  find(id: string): Promise<Contract> {
    return unpackData(
      this._client
        .authApiClient()
        .get(`/contracts/${id}`, { headers: { Accept: "application/json" } }),
      "contract"
    );
  }

  accept(id: string, locale: string): Promise<Contract> {
    return unpackData(
      this._client
        .authApiClient()
        .post(
          `/contracts/${id}/accept`,
          { locale },
          { headers: { Accept: "application/json" } }
        ),
      "contract"
    );
  }
}
