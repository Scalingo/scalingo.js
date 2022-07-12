/** Deployment has been queued and will start shortly **/
export const STATUS_QUEUED = "queued";
/** Building is ongoing */
export const STATUS_BUILDING = "building";
/** The code is being pushed */
export const STATUS_PUSHING = "pushing";
/** The application is starting */
export const STATUS_STARTING = "starting";
/** The deployment was succesful */
export const STATUS_SUCCESS = "success";
/** The application built crashed when booting */
export const STATUS_CRASHED_ERROR = "crashed-error";
/** The application built took too long to respond after booting */
export const STATUS_TIMEOUT_ERROR = "timeout-error";
/** The application couldn't be built */
export const STATUS_BUILD_ERROR = "build-error";
/** The deployment was aborted */
export const STATUS_ABORTED = "aborted";
/** The deployment failed because a hook failed */
export const STATUS_HOOK_ERROR = "hook-error";
//# sourceMappingURL=deployments.js.map