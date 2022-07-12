import { unpackData } from "../utils";
/**
 * Contract and Agreements API Client
 */
export default class Contracts {
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client) {
        this._client = client;
    }
    /**
     * Get all existing contracts
     */
    all() {
        return unpackData(this._client.authApiClient().get("/contracts"), "contracts");
    }
    /**
     * Get all existing contract agreements
     */
    allAgreements() {
        return unpackData(this._client.authApiClient().get("/contract_agreements"), "contract_agreements");
    }
    /**
     * Show a given contract
     */
    show(id) {
        return unpackData(this._client.authApiClient().get(`/contracts/${id}`), "contract");
    }
    /**
     * Show a given contract agreement
     */
    showAgreement(id) {
        return unpackData(this._client.authApiClient().get(`/contract_agreements/${id}`), "contract_agreement");
    }
    /** Create an agreement for the given contract */
    createAgreement(params) {
        return unpackData(this._client
            .authApiClient()
            .post(`/contract_agreements`, { contract_agreement: params }), "contract_agreement");
    }
}
//# sourceMappingURL=index.js.map