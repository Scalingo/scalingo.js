import WebSocket from 'isomorphic-ws'
import { Client } from '..'
import { DeploymentStatus } from '@/Deployments'

/** @see https://developers.scalingo.com/deployments#get-real-time-output-of-a-live-deployment */
export interface EventNewDeployment {
  /** ID of the new deployment */
  deployment: string
}

/** @see https://developers.scalingo.com/deployments#get-real-time-output-of-a-live-deployment */
export interface EventNewDeploymentLog {
  /** Deployment ID */
  id: string

  /** log line received */
  content: string
}

/** @see https://developers.scalingo.com/deployments#get-real-time-output-of-a-live-deployment */
export interface EventDeploymentStatusUpdated {
  /** Deployment ID */
  id: string

  /** New deployment status */
  status: DeploymentStatus
}

export interface MessageHandlers {
  [index: string]: ((e: any) => void) | undefined | null

  new?: (e: EventNewDeployment) => void
  log?: (e: EventNewDeploymentLog) => void
  status?: (e: EventDeploymentStatusUpdated) => void
}

export default class Listener {
  /** Scalingo API Client */
  _client: Client

  _messageTypes: MessageHandlers = {}

  /** URL of the stream to listen to */
  _url: string

  _ws: WebSocket | undefined | null

  _onClose?: (e?: WebSocket.CloseEvent) => void

  /**
   * Create a new deployment listener
   * @param client Scalingo API Client
   * @param url URL of the stream to listen to
   */
  constructor(client: Client, url: string) {
    this._client = client
    this._messageTypes = {}
    this._url = url
    this._start()
  }

  _start(): void {
    this._ws = new WebSocket(this._url)
    this._ws.onopen = (): void => this._auth()

    this._ws.onclose = (): void => {
      this._onClose?.()
      this._ws = null
    }

    this._ws.onmessage = (message): void => {
      this._onMessage(message)
    }
  }

  _auth(): void {
    this._ws?.send(
      JSON.stringify({
        type: 'auth',
        data: {
          token: this._client._token,
        },
      }),
    )
  }

  _onMessage(message: WebSocket.MessageEvent): void {
    const data = JSON.parse(message.data.toString())
    if (this._messageTypes[data.type]) {
      const result = data.data

      // If there was an ID in the original message
      if (data.id) {
        // Inject it in the result object
        result['id'] = data.id
      }

      this._messageTypes[data.type]?.(result)
    }
  }

  /** Close the listener connection */
  close(): void {
    this._ws?.close()
    this._ws = null
  }

  /**
   * Setup a callback that will be called when the connection is closed.
   * @param {function()} callback Callback to call when the connection is closed
   */
  onClose(callback: (e?: WebSocket.CloseEvent) => void): void {
    this._onClose = callback
  }

  /**
   * Setup a callback that will be called when there is a new deployment.
   * @param callback Callback to call when there is a new deployment
   */
  onNew(callback: (e: EventNewDeployment) => void): void {
    this._messageTypes['new'] = callback
  }

  /**
   * Setup a callback that will be called when a new log line is received.
   * @param callback Callback to call when a new log line is received
   */
  onLog(callback: (e: EventNewDeploymentLog) => void): void {
    this._messageTypes['log'] = callback
  }

  /**
   * Setup a callback that will be called when the deployment status is updated.
   * @param callback Callback to call when the deployment status is updated
   */
  onStatus(callback: (e: EventDeploymentStatusUpdated) => void): void {
    this._messageTypes['status'] = callback
  }
}
