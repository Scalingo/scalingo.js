import WebSocket from 'isomorphic-ws'
import { Client } from '..'
import { DeploymentStatus } from '../Deployments'

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

type NewDeploymentHandler = (e: EventNewDeployment) => void
type DeploymentLogHandler = (e: EventNewDeploymentLog) => void
type DeploymentStatusHandler = (e: EventDeploymentStatusUpdated) => void
type UnknownHandler = (...args: unknown[]) => void

export type MessageTypes = 'new' | 'log' | 'status'
export interface MessageHandlers {
  new: NewDeploymentHandler[]
  log: DeploymentLogHandler[]
  status: DeploymentStatusHandler[]
  unknown: UnknownHandler[]
}

export interface LifecycleHandlers {
  beforeOpen: (() => void)[]
  onOpen: ((e?: WebSocket.OpenEvent) => void)[]
  beforeClose: (() => void)[]
  onClose: ((e?: WebSocket.CloseEvent) => void)[]
}

function knownMessageType(str: string): str is MessageTypes {
  return ['new', 'log', 'status'].includes(str)
}

export default class Listener {
  /** Scalingo API Client */
  readonly client: Client

  /** URL of the stream to listen to */
  readonly url: string

  private wsHandlers: MessageHandlers = {
    new: [],
    log: [],
    status: [],
    unknown: [],
  }

  private lifecycleHandlers: LifecycleHandlers = {
    beforeOpen: [],
    onOpen: [],
    beforeClose: [],
    onClose: [],
  }

  private ws: WebSocket | undefined | null

  /**
   * Create a new deployment listener
   * @param client Scalingo API Client
   * @param url URL of the stream to listen to
   * @param autoStart wether to start the listener right away
   */
  constructor(client: Client, url: string, autoStart = true) {
    this.client = client
    this.url = url

    // Auth on login
    this.onOpen(() => this.performAuth())

    if (autoStart) {
      this.start()
    }
  }

  start(): void {
    // Before opening
    for (const callback of this.lifecycleHandlers.beforeOpen) {
      callback()
    }

    this.ws = new WebSocket(this.url)
    this.ws.onopen = (e): void => {
      for (const callback of this.lifecycleHandlers.onOpen) {
        callback(e)
      }
    }

    this.ws.onclose = (e): void => {
      for (const callback of this.lifecycleHandlers.onClose) {
        callback(e)
      }

      this.ws = null
    }

    this.ws.onmessage = (message): void => {
      this.handleMessage(message)
    }
  }

  /** Close the listener connection */
  close(): void {
    // Before opening
    for (const callback of this.lifecycleHandlers.beforeClose) {
      callback()
    }

    this.ws?.close()
    this.ws = null
  }

  performAuth(): void {
    this.ws?.send(
      JSON.stringify({
        type: 'auth',
        data: {
          token: this.client._token,
        },
      }),
    )
  }

  /** Generic incoming message handling */
  handleMessage(message: WebSocket.MessageEvent): void {
    const data = JSON.parse(message.data.toString())
    const type = data.type as string

    if (knownMessageType(type) && this.wsHandlers[type]) {
      const result = data.data

      // If there was an ID in the original message
      if (data.id) {
        // Inject it in the result object
        result.id = data.id
      }

      for (const callback of this.wsHandlers[type]) {
        callback(result)
      }
    } else {
      for (const callback of this.wsHandlers.unknown) {
        callback(data)
      }
    }
  }

  // Lifecycle handlers
  /**
   * Setup a handler that will be called just before the connection is opened.
   * @param handler handler to call
   */
  beforeOpen(handler: () => void): void {
    this.lifecycleHandlers.beforeOpen.push(handler)
  }

  /**
   * Setup a handler that will be called when the connection is opened.
   * @param handler handler to call
   */
  onOpen(handler: (e?: WebSocket.OpenEvent) => void): void {
    this.lifecycleHandlers.onOpen.push(handler)
  }

  /**
   * Setup a handler that will be called just before the connection is closed.
   * @param handler handler to call
   */
  beforeClose(handler: () => void): void {
    this.lifecycleHandlers.beforeClose.push(handler)
  }

  /**
   * Setup a handler that will be called when the connection is closed.
   * @param handler andler to call when the connection is closed
   */
  onClose(handler: (e?: WebSocket.CloseEvent) => void): void {
    this.lifecycleHandlers.onClose.push(handler)
  }

  /**
   * Setup a handler that will be called when there is a new deployment.
   * @param handler handler to call when there is a new deployment
   */
  onNew(handler: (e: EventNewDeployment) => void): void {
    this.wsHandlers.new.push(handler)
  }

  /**
   * Setup a handler that will be called when a new log line is received.
   * @param handler handler to call when a new log line is received
   */
  onLog(handler: (e: EventNewDeploymentLog) => void): void {
    this.wsHandlers.log.push(handler)
  }

  /**
   * Setup a handler that will be called when the deployment status is updated.
   * @param handler handler to call when the deployment status is updated
   */
  onStatus(handler: (e: EventDeploymentStatusUpdated) => void): void {
    this.wsHandlers.status.push(handler)
  }
}
