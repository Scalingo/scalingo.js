import { Client } from "..";
import { Container, ContainersOperation, ContainerSize, ContainerProcess } from "../models/regional/containers";
import Operation from "../Operations/utils";
import { RunParams, RunResponse } from "../params/regional/containers";
/**
 * Containers API Client
 */
export default class Containers {
    /** Scalingo API Client */
    _client: Client;
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client: Client);
    /**
     * Get container formation for an app
     * @see https://developers.scalingo.com/apps#get-containers-list
     * @param appId ID of the app to get the formation from
     */
    for(appId: string): Promise<Container[]>;
    /**
     * List the current processes of the application
     * @see https://developers.scalingo.com/apps#get-containers-list
     * @param appId ID of the app to get the containers from
     */
    processes(appId: string): Promise<ContainerProcess[]>;
    /**
     * Run a command in a one-off process
     * @see https://developers.scalingo.com/apps#run-a-one-off-container
     * @param appId ID of the app to get the containers from
     * @param opts Command and options for the one-off
     */
    run(appId: string, opts: RunParams): Promise<RunResponse>;
    /**
     * Stop a running one-off
     * @see https://developers.scalingo.com/apps#stop-a-container
     * @param appId ID of the parent app
     * @param containerId ID of the one-off container to stop
     */
    stop(appId: string, containerId: string): Promise<void>;
    /**
     * Scale an application
     * @see https://developers.scalingo.com/apps#scale-an-application
     * @param appId ID of the app to scale
     * @param formation Formation to apply
     * @return final formation
     */
    scale(appId: string, formation: Container[]): Promise<ContainersOperation>;
    /**
     * List the every sizes of the containers
     * @see https://developers.scalingo.com/container_sizes#list-the-container-sizes-available
     * @return attributes of each container
     */
    availableSizes(): Promise<ContainerSize[]>;
    /**
     * Restart containers
     * @see https://developers.scalingo.com/apps#restart-an-application
     * @param appId ID of the app to scale
     * @param scope Array of containers name to restart
     * @return final formation
     */
    restart(appId: string, scope?: string): Promise<Operation>;
}
//# sourceMappingURL=index.d.ts.map