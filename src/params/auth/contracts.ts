import { ContractLangs } from "../../models/auth/contracts";

export interface CreateAgreementParams {
  /** ID of the contract to agree to */
  contract_id: string;
  /** Locale of the contract to agree to */
  locale: ContractLangs;
}
