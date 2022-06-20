export type ContractLangs = "en" | "fr";

export interface Contract {
  /** Unique key ID */
  id: string;
  /** Contract kind */
  kind: string;
  /** Version of the contract */
  version: string;
  /** Date at which the contract starts applying */
  start_date: string;
  /** Date at which the contract stops applying, if relevant */
  end_date: string | null;
  /** Map of locale => url of the pdf of the contract in locale */
  pdf_urls: Record<ContractLangs, string>;
  /** Map of locale => url of a web page of the contract in locale */
  web_urls: Record<ContractLangs, string>;
}

export interface ContractAgreement {
  /** Unique key ID */
  id: string;
  /** ID of the user who accepted the contract */
  user_id: string;
  /** The date when the contract was accepted */
  date: string;
  /** The locale in which the contract was accepted */
  locale: ContractLangs;
}
