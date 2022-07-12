import { Client } from "..";
import { Branch } from "../models/auth";
import { Deployment } from "../models/regional";
import { PullRequest, ReviewApp, SCMRepoLink } from "../models/regional/scm_repo_links";
import { CreateParams, UpdateParams } from "../params/regional/scm_repo_links";
/**
 * SCM repo links API Client
 */
export declare class SCMRepoLinks {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * Get the repo link associated to an application.
     * @see https://developers.scalingo.com/scm_repo_link#get-an-integration-link
     * @param appID ID of the application
     * @return Promise that when resolved returns a SCMRepoLink
     */
    find(appID: string): Promise<SCMRepoLink>;
    /**
     * Create a SCM repo link.
     * @see https://developers.scalingo.com/scm_repo_link#create-a-scm-integration-link
     * @param appID ID of the application
     * @param opts SCM repo link information
     * @return Promise that when resolved returns the SCMRepoLink created.
     */
    create(appID: string, opts: CreateParams): Promise<SCMRepoLink>;
    /**
     * Update a SCM integration link.
     * @see https://developers.scalingo.com/scm_repo_link
     * @param appID ID of the application
     * @param opts SCM repo link information to update
     * @return Promise that when resolved returns the SCMRepoLink updated.
     */
    update(appID: string, opts: UpdateParams): Promise<SCMRepoLink>;
    /**
     * Delete a SCM repo link
     * @see https://developers.scalingo.com/scm_repo_link#delete-an-integration-link
     * @param {String} appID ID of the application
     * @return {Promise<null>} Promise that resolves when the link is deleted.
     */
    destroy(appID: string): Promise<void>;
    /**
     * Manually deploy an application
     * @see https://developers.scalingo.com/scm_repo_link#manual-deploy
     * @param appID ID of the application
     * @param branch Name of the branch to deploy.
     * @return Promise that when resolved returns the Deployment started.
     * @todo Promise<Deployment>
     */
    manualDeploy(appID: string, branch: string): Promise<Deployment>;
    /**
     * Manually deploy a review app of the given pull/merge request
     * @see https://developers.scalingo.com/scm_repo_link#manual-review-app
     * @param appID ID of the application
     * @param pullRequestID ID of the pull/merge request to deploy
     * @return Promise that when resolved returns the App created.
     * @todo Promise<App>
     */
    manualReviewApp(appID: string, pullRequestID: string): Promise<ReviewApp>;
    /**
     * List the branches of the remote repository.
     * @see https://developers.scalingo.com/scm_repo_link
     * @param appID ID of the application
     * @return Promise that when resolved returns an array of branches.
     * @todo Promise<Branch[]>
     */
    branches(appID: string): Promise<Branch[]>;
    /**
     * List the merge/pull requests of the remote repository.
     * @see https://developers.scalingo.com/scm_repo_link
     * @param appID ID of the application
     * @return Promise that when resolved returns an array of pull requests.
     * @todo Promise<PullRequest[]>
     */
    pulls(appID: string): Promise<PullRequest[]>;
    /**
     * List the review apps of the supplied app.
     * @param appID ID of the application
     * @return Promise that when resolved returns an array of review apps.
     * @todo Promise<ReviewApp[]>
     */
    reviewApps(appID: string): Promise<ReviewApp[]>;
}
export default SCMRepoLinks;
//# sourceMappingURL=index.d.ts.map