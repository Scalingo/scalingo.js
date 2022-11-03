export type ContractLangs = "en" | "fr";

export type LocalizedAttribute = Partial<Record<ContractLangs, string>>;

export type RequirementScope = "platform" | "hds";

export interface Acceptance {
  on: string;
  locale: string;
}

export interface Refusal {
  on: string;
  reason: string;
}

export interface Document {
  name: Required<LocalizedAttribute>;
  short: Required<LocalizedAttribute>;
  web: LocalizedAttribute;
  pdf: Required<LocalizedAttribute>;
}

export interface Contract {
  id: string;
  version: string;
  latest: boolean;
  required_for: RequirementScope[];
  enroll_at: string | null;
  next_version_id: string | null;
  depends_on_id: string | null;
  documents: Document[];
  name: Required<LocalizedAttribute>;
  short: Required<LocalizedAttribute>;
  blog_article: LocalizedAttribute;
  published_at: string;
  accepted: Acceptance | null;
  refused?: Refusal;
}
