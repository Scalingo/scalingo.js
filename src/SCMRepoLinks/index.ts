import { unpackData } from "../utils";
import { Client } from "..";
import {
  PullRequest,
  ReviewApp,
  SCMRepoLink,
} from "../models/regional/scm_repo_links";
import { CreateParams, UpdateParams } from "../params/regional/scm_repo_links";
import { Branch } from "src/models/auth";
import { Deployment } from "src/models/regional";

/**
 * SCM repo links API Client
 */
export class SCMRepoLinks {
  /** Scalingo API Client */
  _client: Client;

  /**
   * Create a new "thematic" client
   * @param client Scalingo API Client
   */
  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Get the repo link associated to an application.
   * @see https://developers.scalingo.com/scm_repo_link#get-an-integration-link
   * @param appID ID of the application
   * @return Promise that when resolved returns a SCMRepoLink
   */
  find(appID: string): Promise<SCMRepoLink> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appID}/scm_repo_link`),
      "scm_repo_link"
    );
  }

  /**
   * Create a SCM repo link.
   * @see https://developers.scalingo.com/scm_repo_link#create-a-scm-integration-link
   * @param appID ID of the application
   * @param opts SCM repo link information
   * @return Promise that when resolved returns the SCMRepoLink created.
   */
  create(appID: string, opts: CreateParams): Promise<SCMRepoLink> {
    return unpackData(
      this._client
        .apiClient()
        .post(`/apps/${appID}/scm_repo_link`, { scm_repo_link: opts }),
      "scm_repo_link"
    );
  }

  /**
   * Update a SCM integration link.
   * @see https://developers.scalingo.com/scm_repo_link
   * @param appID ID of the application
   * @param opts SCM repo link information to update
   * @return Promise that when resolved returns the SCMRepoLink updated.
   */
  update(appID: string, opts: UpdateParams): Promise<SCMRepoLink> {
    return unpackData(
      this._client
        .apiClient()
        .patch(`/apps/${appID}/scm_repo_link`, { scm_repo_link: opts }),
      "scm_repo_link"
    );
  }

  /**
   * Delete a SCM repo link
   * @see https://developers.scalingo.com/scm_repo_link#delete-an-integration-link
   * @param {String} appID ID of the application
   * @return {Promise<null>} Promise that resolves when the link is deleted.
   */
  destroy(appID: string): Promise<void> {
    return unpackData(
      this._client.apiClient().delete(`/apps/${appID}/scm_repo_link`)
    );
  }

  /**
   * Manually deploy an application
   * @see https://developers.scalingo.com/scm_repo_link#manual-deploy
   * @param appID ID of the application
   * @param branch Name of the branch to deploy.
   * @return Promise that when resolved returns the Deployment started.
   * @todo Promise<Deployment>
   */
  manualDeploy(appID: string, branch: string): Promise<Deployment> {
    return unpackData(
      this._client
        .apiClient()
        .post(`/apps/${appID}/scm_repo_link/manual_deploy`, {
          branch,
        }),
      "deployment"
    );
  }

  /**
   * Manually deploy a review app of the given pull/merge request
   * @see https://developers.scalingo.com/scm_repo_link#manual-review-app
   * @param appID ID of the application
   * @param pullRequestID ID of the pull/merge request to deploy
   * @return Promise that when resolved returns the App created.
   * @todo Promise<App>
   */
  manualReviewApp(appID: string, pullRequestID: string): Promise<ReviewApp> {
    return unpackData(
      this._client
        .apiClient()
        .post(`/apps/${appID}/scm_repo_link/manual_review_app`, {
          pull_request_id: pullRequestID,
        }),
      "review_app"
    );
  }

  /**
   * List the branches of the remote repository.
   * @see https://developers.scalingo.com/scm_repo_link
   * @param appID ID of the application
   * @return Promise that when resolved returns an array of branches.
   * @todo Promise<Branch[]>
   */
  branches(appID: string): Promise<Branch[]> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appID}/scm_repo_link/branches`),
      "branches"
    );
  }

  /**
   * List the merge/pull requests of the remote repository.
   * @see https://developers.scalingo.com/scm_repo_link
   * @param appID ID of the application
   * @return Promise that when resolved returns an array of pull requests.
   * @todo Promise<PullRequest[]>
   */
  pulls(appID: string): Promise<PullRequest[]> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appID}/scm_repo_link/pulls`),
      "pulls"
    );
  }

  /**
   * List the review apps of the supplied app.
   * @param appID ID of the application
   * @return Promise that when resolved returns an array of review apps.
   * @todo Promise<ReviewApp[]>
   */
  reviewApps(appID: string): Promise<ReviewApp[]> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appID}/scm_repo_link/review_apps`),
      "review_apps"
    );
  }
}

export default SCMRepoLinks;
