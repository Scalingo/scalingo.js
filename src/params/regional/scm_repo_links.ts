/** @see https://developers.scalingo.com/scm_repo_link#create-a-scm-integration-link */
export interface CreateParams {
  source?: string
  branch?: string
  auth_integration_uuid?: string
  auto_deploy_enabled?: boolean
  deploy_review_apps_enabled?: boolean
  delete_on_close_enabled?: boolean
  hours_before_delete_on_close?: number
  delete_stale_enabled?: boolean
  hours_before_delete_stale?: number
}

/** @see https://developers.scalingo.com/scm_repo_link#update-a-scm-integration-link */
export interface UpdateParams {
  branch?: string
  auto_deploy_enabled?: boolean
  deploy_review_apps_enabled?: boolean
  delete_on_close_enabled?: boolean
  hours_before_delete_on_close?: number
  delete_stale_enabled?: boolean
  hours_before_delete_stale?: number
}
