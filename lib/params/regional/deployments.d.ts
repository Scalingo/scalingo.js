export interface CreateParams {
    /** URL of the archive to deploy */
    source_url: string;
    /** String identifying the archive */
    git_ref?: string;
    /** A command to be executed after the deployment and before the app starts */
    postdeploy_hook?: string;
}
//# sourceMappingURL=deployments.d.ts.map