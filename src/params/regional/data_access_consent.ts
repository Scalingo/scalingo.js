import { DataAccessConsent } from "src/models/regional";

export type CreateParams = Pick<
  DataAccessConsent,
  "containers_until" | "databases_until"
>;

export type UpdateParams = CreateParams;
