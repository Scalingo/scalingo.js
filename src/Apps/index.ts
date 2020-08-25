import { unpackData } from '../utils'
import Listener from '../Deployments/listener'
import { Client } from '..'

import { App } from '../models/regional/apps'

/** @see https://developers.scalingo.com/apps#create-an-application */
export interface AppCreateOpts {
  /** ID of the parent app (used to create child apps) */
  parent_id?: string
  /** ID of the stack the application should use */
  stack_id?: string
  /** If set to true, the API will run the validations but wont create the app */
  dry_run?: boolean
  /** URL to the future GitHub repository if your need to deploy from there without going through the git push workflow */
  git_source?: string
}

/** @see https://developers.scalingo.com/apps#update-application-settings */
export interface AppUpdateOpts {
  /** Enable or disable force HTTPS on the application */
  force_https?: boolean
  /** Enable or disable sticky session on the application */
  sticky_session?: boolean
  /** Enable or disable the router logs on the application */
  router_logs?: boolean
  /** New stack ID */
  stack_id?: string
}

/**
 * Apps API Client
 */
export default class Apps {
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
   * Fetch a specific app
   * @see https://developers.scalingo.com/apps#get-a-precise-application
   * @param id ID of the application
   * @return Promise that when resolved returns an App. See: https://developers.scalingo.com/apps#application-attributes
   */
  find(id: string): Promise<App> {
    return unpackData(this._client.apiClient().get(`/apps/${id}`), 'app')
  }

  /**
   * Get all your applications and the one your are collaborator for
   * @see https://developers.scalingo.com/apps#list-your-applications
   * @return Promise that when resolved returns an App array. See: https://developers.scalingo.com/apps#application-attributes
   */
  all(): Promise<App[]> {
    return unpackData(this._client.apiClient().get('/apps'), 'apps')
  }

  /**
   * Create a new application
   * @see https://developers.scalingo.com/apps#create-an-application
   * @param name Name of the application
   * @param opts Optional additional information
   * @return Promise that when resolved returns the App created.
   */
  create(name: string, opts: AppCreateOpts): Promise<App> {
    const body: Record<string, any> = {
      name: name,
    }

    const headers: Record<string, any> = {}

    if (opts) {
      body['git_source'] = opts['git_source']
      body['parent_id'] = opts['parent_id']
      body['stack_id'] = opts['stack_id']
      if (opts['dry_run']) {
        headers['X-Dry-Run'] = 'true'
      }
    }
    return unpackData(
      this._client.apiClient().post('/apps', { app: body }, { headers }),
      'app',
    )
  }

  /**
   * Open a listener on this app deployment events
   * @see https://developers.scalingo.com/deployments#get-real-time-output-of-a-live-deployment
   * @param id ID of the application
   * @return Promise that when resolved returns a Listener for this application.
   */
  async deploymentListener(id: string): Promise<Listener> {
    const app = (await this.find(id)) as App
    return new Listener(this._client, app.links.deployments_stream)
  }

  /**
   * Get an authenticated URL for the application logs
   * @see https://developers.scalingo.com/apps#access-to-the-application-logs
   * @param id ID of the application
   * @return Promise that when resolved returns a pre-signed URL to access application logs.
   */
  logsURL(id: string): Promise<string> {
    return unpackData(
      this._client.apiClient().get(`/apps/${id}/logs`),
      'logs_url',
    )
  }

  /**
   * Destroy the given application.
   * @see https://developers.scalingo.com/apps.html#delete-an-application
   * @param appID ID of the application
   * @param currentName Current name of the application. Used as validation.
   * @return Promise that resolves when the app is deleted.
   */
  destroy(appID: string, currentName: string): Promise<void> {
    return unpackData(
      this._client
        .apiClient()
        .delete(`/apps/${appID}`, { params: { current_name: currentName } }),
    )
  }

  /**
   * Rename the application.
   * @see https://developers.scalingo.com/apps.html#rename-an-application
   * @param appID ID of the application
   * @param currentName Current name of the application. Used as validation.
   * @param newName New name of the application.
   * @return Promise that when resolved returns the App renamed.
   */
  rename(appID: string, currentName: string, newName: string): Promise<App> {
    return unpackData(
      this._client.apiClient().post(`/apps/${appID}/rename`, {
        current_name: currentName,
        new_name: newName,
      }),
      'app',
    )
  }

  /**
   * Transfer the ownership of the application to a new account.
   * @see https://developers.scalingo.com/apps.html#transfer-ownership-of-an-application
   * @param appID ID of the application
   * @param currentName Current name of the application. Used as validation.
   * @param ownerEmail Email address of the new owner.
   * @return Promise that when resolved returns the App transferred.
   */
  transfer(
    appID: string,
    currentName: string,
    ownerEmail: string,
  ): Promise<App> {
    return unpackData(
      this._client.apiClient().patch(
        `/apps/${appID}`,
        {
          app: {
            owner: ownerEmail,
          },
        },
        { params: { current_name: currentName } },
      ),
      'app',
    )
  }

  /**
   * Update application settings: force HTTPS, sticky session, stack or router
   * logs.
   * @see https://developers.scalingo.com/apps#update-application-settings
   * @param {String} appID ID of the application
   * @param {AppUpdateOpts} appSettings - Settings to modify
   * @return {Promise<App>} Promise that when resolved returns the updated App.
   */
  update(appID: string, appSettings: AppUpdateOpts): Promise<App> {
    return unpackData(
      this._client.apiClient().patch(`/apps/${appID}`, { app: appSettings }),
      'app',
    )
  }
}
