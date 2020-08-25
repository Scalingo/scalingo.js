export type SCMType =
  | 'github'
  | 'gitlab'
  | 'github-enterprise'
  | 'gitlab-self-hosted'

/** @see https://developers.scalingo.com/scm_repo_link */
export interface SCMRepoLink {
  /** Unique ID */
  id: string

  /** Application ID */
  app_id: string

  /** ID of the SCM integration */
  scm_integration_uuid: string

  /** Description of the user that linked this repository */
  linker: Record<string, any>

  /** Repository owner name */
  owner: string

  /** Repository name */
  repo: string

  /** Name of the branch used for auto-deployment */
  branch: string

  /** Type of the SCM integration */
  scm_type: SCMType

  /** Creation date of the SCM link */
  created_at: Date

  /** Last time the SCM link has been updated */
  updated_at: Date

  /** Trigger a new deployment when the linked branch is updated */
  auto_deploy_enabled: boolean

  /** Activation of the review apps feature */
  deploy_review_apps_enabled: boolean

  /** Review App: delete the review app when the pull request is closed */
  delete_on_close_enabled: boolean

  /** Review App: time to wait before deleting a review app linked to a closed pull request (in hours) */
  hours_before_delete_on_close: number

  /** Review App: delete the review app when there is no activity on the pull request */
  delete_stale_enabled: boolean

  /** Review App: time to wait for activity on the pull request before deleting the review app (in hours) */
  hours_before_delete_stale: number

  /** Date of the last deployment triggered by this link */
  last_auto_deploy_at: string
}

/** @see https://developers.scalingo.com/scm_repo_link */
export interface Branch {
  /** Name of the branch */
  name: string
}

/** @see https://developers.scalingo.com/scm_repo_link */
export interface PullRequest {
  id: string

  /** URL to the pull/merge request */
  html_url: string

  /** Number identifying the pull/merge request on the SCM tool */
  number: number

  /** Title of the pull/merge request */
  title: string
}
