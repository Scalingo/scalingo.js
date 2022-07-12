import { Client } from "..";
import { Contract, ContractAgreement } from "../models/auth/contracts";
import { CreateAgreementParams } from "../params/auth/contracts";
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
    constructor(client: Client);
    /**
     * Get all existing contracts
     */
    all(): Promise<Contract[]>;
    /**
     * Get all existing contract agreements
     */
    allAgreements(): Promise<ContractAgreement[]>;
    /**
     * Show a given contract
     */
    show(id: string): Promise<Contract>;
    /**
     * Show a given contract agreement
     */
    showAgreement(id: string): Promise<ContractAgreement>;
    /** Create an agreement for the given contract */
    createAgreement(params: CreateAgreementParams): Promise<ContractAgreement>;
}
//# sourceMappingURL=index.d.ts.map