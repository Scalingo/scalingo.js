import { unpackData } from '../utils'
import { Client, APIResponse } from '..'
import { PaginationMeta, PaginationOpts } from '../meta'

/** @see https://developers.scalingo.com/deployments */
export interface Deployment {
  /** unique ID */
  id: string
  /** unique ID referencing the app this deployment belongs to */
  app_id: string
  /** date of creation */
  created_at: string
  /** status of the deployment (building, success, aborted, *-error) */
  status: DeploymentStatus
  /** git SHA */
  git_ref: string
  /** embedded user who pushed the GIT reference */
  pusher: DeploymentPusher
  /** hypermedia links about the deployment */
  links: DeploymentLinks
}

/** @see https://developers.scalingo.com/deployments */
export interface DeploymentPusher {
  /** unique ID */
  id: string
  /** email of user who pushed */
  email: string
  /** username on Scalingo's platform */
  username: string
}

/* @see https://developers.scalingo.com/deployments */
export interface DeploymentLinks {
  /** URL to the logs of the deployment */
  output: string
}

export interface DeploymentsResult {
  /** List of deployments */
  deployments: Deployment[]
  /** metadata linked to this request */
  meta: DeploymentsMeta
}

export interface DeploymentsMeta {
  /** Pagination metadata */
  pagination: PaginationMeta
}

/** Building is ongoing */
export const STATUS_BUILDING = 'building'
/** The code is being pushed */
export const STATUS_PUSHING = 'pushing'
/** The application is starting */
export const STATUS_STARTING = 'starting'
/** The deployment was succesful */
export const STATUS_SUCCESS = 'success'
/** The application built crashed when booting */
export const STATUS_CRASHED_ERROR = 'crashed-error'
/** The application built took too long to respond after booting */
export const STATUS_TIMEOUT_ERROR = 'timeout-error'
/** The application couldn't be built */
export const STATUS_BUILD_ERROR = 'build-error'
/** The deployment was aborted */
export const STATUS_ABORTED = 'aborted'

export type DeploymentStatus =
  | typeof STATUS_BUILDING
  | typeof STATUS_PUSHING
  | typeof STATUS_STARTING
  | typeof STATUS_SUCCESS
  | typeof STATUS_CRASHED_ERROR
  | typeof STATUS_TIMEOUT_ERROR
  | typeof STATUS_BUILD_ERROR
  | typeof STATUS_ABORTED

/**
 * Deployment API Client
 */

export default class Deployments {
  /** Scalingo API Client */
  _client: Client

  /**
   * Create a new "thematic" client
   * @param client Scalingo API Client
   */
  constructor(client: Client) {
    this._client = client
  }

  /**
   * List all deployments for an app
   * @see https://developers.scalingo.com/deployments#list-the-deployments-of-an-app
   * @param appId ID of the app
   * @param opts optional parameters
   * @return List of deployments for this app
   */
  for(appId: string, opts: PaginationOpts): APIResponse<DeploymentsResult> {
    return unpackData(
      this._client
        .apiClient()
        .get(`/apps/${appId}/deployments`, { params: opts }),
    )
  }

  /**
   * Get a deployment of an app
   * @see https://developers.scalingo.com/deployments#get-a-particular-deployment
   * @param appId ID of the app
   * @param deploymentId ID of the deployment
   * @return {Promise<Deployment | APIError>} Details of the deployment
   */
  find(appId: string, deploymentId: string): APIResponse<Deployment> {
    return unpackData(
      this._client
        .apiClient()
        .get(`/apps/${appId}/deployments/${deploymentId}`),
      'deployment',
    )
  }

  /**
   * Get the logs of a deployment
   * @see https://developers.scalingo.com/deployments#get-the-output-of-the-deployment
   * @param appId ID of the app
   * @param deploymentId ID of the deployment
   * @return Logs of the deployment
   */
  logs(appId: string, deploymentId: string): APIResponse<string> {
    return unpackData(
      this._client
        .apiClient()
        .get(`/apps/${appId}/deployments/${deploymentId}/output`),
    )
  }
}
