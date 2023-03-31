import { User } from "./user";

/**
 * Can take one of the following values:
 * - **github** is a GitHub.com integration
 * - **gitlab** is a GitLab.com integration
 * - **github-enterprise** is a GitHub Enterprise self-hosted instance
 * - **gitlab-self-hosted** is a GitLab self-hosted instance
 */
export type SCMType =
  | "github"
  | "gitlab"
  | "github-enterprise"
  | "gitlab-self-hosted";

/** @see https://developers.scalingo.com/scm_integrations */
export interface SCMIntegration {
  /** Unique ID */
  id: string;
  /** Type of the SCM integration */
  scm_type: SCMType;
  /** URL where the SCM platform is hosted */
  url: string;
  /** Creation date of the SCM integration */
  created_at: string;
  /** User ID provided by the SCM platform */
  uid: string;
  /** Username provided by the SCM platform */
  username: string;
  /** User avatar URL provided by the SCM platform */
  avatar_url: string;
  /** User email provided by the SCM platform */
  email: string;
  /** User profile URL provided by the SCM platform */
  profile_url: string;
  /** Owner of the SCM integration */
  owner: User;
}

/** @see https://developers.scalingo.com/scm_integrations# */
export interface PullRequest {
  /** Unique key ID */
  id: number;
  /** Pull/Merge request number */
  number: number;
  /** Title of the pull/merge request */
  title: string;
  /** URL to the pull/merge request */
  html_url: string;
  /** Name of the source repo */
  source_repo_name: string;
  /** URL to the source repo */
  source_repo_html_url: string;
}

/** @see https://developers.scalingo.com/scm_integrations# */
export interface Repository {
  /** Unique key ID */
  id: number;
  /** Description of the repository */
  description: string;
  /** Name of the repository including the name of the owner (e.g. owner/repository) */
  fullName: string;
  /** Name of the repository */
  name: string;
  /** URL to the repository */
  url: string;
}

/** @see https://developers.scalingo.com/scm_integrations# */
export interface Organization {
  /** Unique key ID */
  id: number;
  /** URL of the avatar of the organization */
  avatarUrl: string;
  /** Description of the organization */
  description: string;
  /** Name of the organization */
  login: string;
  /** URL to the SCM API for the organization */
  url: string;
}

/** @see https://developers.scalingo.com/scm_repo_link */
export interface Branch {
  /** Name of the branch */
  name: string;
}
