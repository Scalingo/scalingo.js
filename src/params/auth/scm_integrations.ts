import { SCMType } from "../../models/auth/scm_integrations";

/** @see https://developers.scalingo.com/scm_integrations#createlink-an-scm-integration-with-your-account */
export interface CreateParams {
  /** Type of the SCM integration */
  scm_type: SCMType;
  /** Endpoint URL of the SCM platform (e.g. https://gitlab.example.com) */
  url: string;
  /** Access token provided by an SCM platform */
  access_token: string;
}
