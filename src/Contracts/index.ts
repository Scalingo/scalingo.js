import { Client } from "..";
import { Contract, ContractAgreement } from "../models/auth/contracts";
import { CreateAgreementParams } from "../params/auth/contracts";
import { unpackData } from "../utils";

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

  /**
   * Get all existing contracts
   */
  all(): Promise<Contract[]> {
    return unpackData(
      this._client.authApiClient().get("/contracts"),
      "contracts"
    );
  }

  /**
   * Get all existing contract agreements
   */
  allAgreements(): Promise<ContractAgreement[]> {
    return unpackData(
      this._client.authApiClient().get("/contract_agreements"),
      "contract_agreements"
    );
  }

  /**
   * Show a given contract
   */
  show(id: string): Promise<Contract> {
    return unpackData(
      this._client.authApiClient().get(`/contracts/${id}`),
      "contract"
    );
  }

  /**
   * Show a given contract agreement
   */
  showAgreement(id: string): Promise<ContractAgreement> {
    return unpackData(
      this._client.authApiClient().get(`/contract_agreements/${id}`),
      "contract_agreement"
    );
  }

  /** Create an agreement for the given contract */
  createAgreement(params: CreateAgreementParams): Promise<ContractAgreement> {
    return unpackData(
      this._client
        .authApiClient()
        .post(`/contract_agreements`, { contract_agreement: params }),
      "contract_agreement"
    );
  }
}
