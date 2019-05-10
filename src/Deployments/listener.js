import WebSocket from 'isomorphic-ws'

export default class Listener {
  /**
   * Create a new deployment listener
   * @param {Client} client - Scalingo API Client
   * @param {String} url - URL of the stream to listen to
   */
  constructor(client, url) {
    this._client = client
    this._messageTypes = {}
    this._url = url
    this._start()
  }

  _start() {
    this._ws = new WebSocket(this._url)
    this._ws.onopen = () => {
      this._auth()
    }

    this._ws.onclose = () => {
      if(this._onClose) {
        this._onClose()
      }
      this._ws = null
    }

    this._ws.onmessage = (message) => {
      this._onMessage(message)
    }
  }

  _auth() {
    this._ws.send(JSON.stringify({
      type: "auth",
      data: {
        token: this._client._token,
      }
    }))
  }

  _onMessage(message) {
    let data = JSON.parse(message.data)
    if(this._messageTypes[data.type]) {
      let result = data.data

      // If there was an ID in the original message
      if(data.id) {
        // Inject it in the result object
        result["id"] = data.id
      }
      this._messageTypes[data.type](result)
    }
  }

  /**
   * Close the listener connection
   */
  close() {
    if(this._ws) {
      this._ws.close()
      this._ws = null
    }
  }

  /**
   * Setup a callback that will be called when the connection is closed.
   * @param {function()} callback Callback to call when the connction is closed
   */

  onClose(callback) {
    this._onClose = callback
  }

  /**
   * Setup a callback that will be called when there is a new deployment.
   * @param {function(data: EventNewDeployment)} callback Callback to call when there is a new deployment
   */
  onNew(callback) {
    this._messageTypes["new"] = callback
  }

  /**
   * Setup a callback that will be called when a new log line is received.
   * @param {function(data: EventNewDeploymentLog)} callback Callback to call when a new log line is received
   */
  onLog(callback) {
    this._messageTypes["log"] = callback
  }

  /**
   * Setup a callback that will be called when the deployment status is updated.
   * @param {function(data: EventDeploymentStatusUpdated)} callback Callback to call when the deployment status is updated
   */
  onStatus(callback) {
    this._messageTypes["status"] = callback
  }
}

/**
 * @typedef {Object} EventNewDeployment
 * @see http://developers.scalingo.com/deployments#get-real-time-output-of-a-live-deployment
 * @property {String} deployment ID of the new deployment
 */

/**
 * @typedef {Object} EventNewDeploymentLog
 * @see http://developers.scalingo.com/deployments#get-real-time-output-of-a-live-deployment
 * @property {String} id Deployment ID
 * @property {String} content log line received
 */

/**
 * @typedef {Object} EventDeploymentStatusUpdated
 * @see http://developers.scalingo.com/deployments#get-real-time-output-of-a-live-deployment
 * @property {String} id Deployment ID
 * @property {DeploymentStatus} status New deployment status
 */
