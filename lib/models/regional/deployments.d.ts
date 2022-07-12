import { PaginationMeta } from "../../meta";
/** @see https://developers.scalingo.com/deployments */
export interface Deployment {
    /** unique ID */
    id: string;
    /** unique ID referencing the app this deployment belongs to */
    app_id: string;
    /** date of creation */
    created_at: string;
    /** status of the deployment (building, success, aborted, *-error) */
    status: DeploymentStatus;
    /** git SHA */
    git_ref: string;
    /** embedded user who pushed the GIT reference */
    pusher: DeploymentPusher;
    /** hypermedia links about the deployment */
    links: DeploymentLinks;
}
/** @see https://developers.scalingo.com/deployments */
export interface DeploymentPusher {
    /** unique ID */
    id: string;
    /** email of user who pushed */
    email: string;
    /** username on Scalingo's platform */
    username: string;
}
export interface DeploymentLinks {
    /** URL to the logs of the deployment */
    output: string;
}
export interface DeploymentsResult {
    /** List of deployments */
    deployments: Deployment[];
    /** metadata linked to this request */
    meta: DeploymentsMeta;
}
export interface DeploymentsMeta {
    /** Pagination metadata */
    pagination: PaginationMeta;
}
/** Deployment has been queued and will start shortly **/
export declare const STATUS_QUEUED = "queued";
/** Building is ongoing */
export declare const STATUS_BUILDING = "building";
/** The code is being pushed */
export declare const STATUS_PUSHING = "pushing";
/** The application is starting */
export declare const STATUS_STARTING = "starting";
/** The deployment was succesful */
export declare const STATUS_SUCCESS = "success";
/** The application built crashed when booting */
export declare const STATUS_CRASHED_ERROR = "crashed-error";
/** The application built took too long to respond after booting */
export declare const STATUS_TIMEOUT_ERROR = "timeout-error";
/** The application couldn't be built */
export declare const STATUS_BUILD_ERROR = "build-error";
/** The deployment was aborted */
export declare const STATUS_ABORTED = "aborted";
/** The deployment failed because a hook failed */
export declare const STATUS_HOOK_ERROR = "hook-error";
export declare type DeploymentStatus = typeof STATUS_QUEUED | typeof STATUS_BUILDING | typeof STATUS_PUSHING | typeof STATUS_STARTING | typeof STATUS_SUCCESS | typeof STATUS_CRASHED_ERROR | typeof STATUS_TIMEOUT_ERROR | typeof STATUS_BUILD_ERROR | typeof STATUS_ABORTED | typeof STATUS_HOOK_ERROR;
//# sourceMappingURL=deployments.d.ts.map