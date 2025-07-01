/** @see https://developers.scalingo.com/apps#create-an-application */
export interface CreateParams {
  /** Name of the application */
  name: string;
  /** ID of the parent app (used to create child apps) */
  parent_id?: string;
  /** ID of the stack the application should use */
  stack_id?: string;
  /** If set to true, the API will run the validations but wont create the app */
  dry_run?: boolean;
  /** URL to the future GitHub repository if your need to deploy from there without going through the git push workflow */
  git_source?: string;
}

/** @see https://developers.scalingo.com/apps#update-application-settings */
export interface UpdateParams {
  /** Enable or disable force HTTPS on the application */
  force_https?: boolean;
  /** Enable or disable sticky session on the application */
  sticky_session?: boolean;
  /** Enable or disable the router logs on the application */
  router_logs?: boolean;
  /** New stack ID */
  stack_id?: string;
  /** New parent project ID */
  project_id?: string;
}
