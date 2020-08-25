import { unpackData } from '../utils'
import { Client } from '..'
import Operation from '../Operations/utils'
import {
  Container,
  ContainersOperation,
  ContainerSize,
} from '../models/regional/containers'
/**
 * Containers API Client
 */
export default class Containers {
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
   * Get container formation for an app
   * @see https://developers.scalingo.com/apps#get-containers-list
   * @param appId ID of the app to get the formation from
   */
  for(appId: string): Promise<Container[]> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/containers`),
      'containers',
    )
  }

  /**
   * Scale an application
   * @see https://developers.scalingo.com/apps#scale-an-application
   * @param appId ID of the app to scale
   * @param formation Formation to apply
   * @return final formation
   */
  async scale(
    appId: string,
    formation: Container[],
  ): Promise<ContainersOperation> {
    const result = await unpackData(
      this._client
        .apiClient()
        .post(`/apps/${appId}/scale`, { containers: formation }),
      'containers',
      { hasOperation: true },
    )
    const operation = new Operation(this._client, result.operation)
    await operation.refresh()
    return { formation: result.data, operation: operation }
  }

  /**
   * List the every sizes of the containers
   * @see https://developers.scalingo.com/container-sizes#list-the-container-sizes-available
   * @return attributes of each container
   */
  availableSizes(): Promise<ContainerSize[]> {
    return unpackData(
      this._client.apiClient().get('/features/container_sizes'),
      'container_sizes',
    )
  }

  /**
   * Restart containers
   * @see https://developers.scalingo.com/apps#restart-an-application
   * @param appId ID of the app to scale
   * @param scope Array of containers name to restart
   * @return final formation
   */
  async restart(appId: string, scope?: string): Promise<Operation> {
    const result = await unpackData(
      this._client.apiClient().post(`/apps/${appId}/restart`, { scope: scope }),
      undefined,
      { hasOperation: true },
    )
    const operation = new Operation(this._client, result.operation)
    await operation.refresh()
    return operation
  }
}
