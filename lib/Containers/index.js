import Operation from "../Operations/utils";
import { unpackData } from "../utils";
/**
 * Containers API Client
 */
export default class Containers {
    /**
     * Create a new "thematic" client
     * @param client Scalingo API Client
     */
    constructor(client) {
        this._client = client;
    }
    /**
     * Get container formation for an app
     * @see https://developers.scalingo.com/apps#get-containers-list
     * @param appId ID of the app to get the formation from
     */
    for(appId) {
        return unpackData(this._client.apiClient().get(`/apps/${appId}/containers`), "containers");
    }
    /**
     * List the current processes of the application
     * @see https://developers.scalingo.com/apps#get-containers-list
     * @param appId ID of the app to get the containers from
     */
    processes(appId) {
        return unpackData(this._client.apiClient().get(`/apps/${appId}/ps`), "containers");
    }
    /**
     * Run a command in a one-off process
     * @see https://developers.scalingo.com/apps#run-a-one-off-container
     * @param appId ID of the app to get the containers from
     * @param opts Command and options for the one-off
     */
    run(appId, opts) {
        return unpackData(this._client.apiClient().post(`/apps/${appId}/run`, opts), "container");
    }
    /**
     * Stop a running one-off
     * @see https://developers.scalingo.com/apps#stop-a-container
     * @param appId ID of the parent app
     * @param containerId ID of the one-off container to stop
     */
    stop(appId, containerId) {
        return unpackData(this._client
            .apiClient()
            .post(`/apps/${appId}/containers/${containerId}/stop`));
    }
    /**
     * Scale an application
     * @see https://developers.scalingo.com/apps#scale-an-application
     * @param appId ID of the app to scale
     * @param formation Formation to apply
     * @return final formation
     */
    async scale(appId, formation) {
        const result = await unpackData(this._client
            .apiClient()
            .post(`/apps/${appId}/scale`, { containers: formation }), "containers", { hasOperation: true });
        if (result.operation) {
            const operation = new Operation(this._client, result.operation);
            await operation.refresh();
            return { formation: result.data, operation: operation };
        }
        else {
            return { formation: result.data };
        }
    }
    /**
     * List the every sizes of the containers
     * @see https://developers.scalingo.com/container_sizes#list-the-container-sizes-available
     * @return attributes of each container
     */
    availableSizes() {
        return unpackData(this._client.apiClient().get("/features/container_sizes"), "container_sizes");
    }
    /**
     * Restart containers
     * @see https://developers.scalingo.com/apps#restart-an-application
     * @param appId ID of the app to scale
     * @param scope Array of containers name to restart
     * @return final formation
     */
    async restart(appId, scope) {
        const result = await unpackData(this._client.apiClient().post(`/apps/${appId}/restart`, { scope: scope }), undefined, { hasOperation: true });
        const operation = new Operation(this._client, result.operation);
        await operation.refresh();
        return operation;
    }
}
//# sourceMappingURL=index.js.map