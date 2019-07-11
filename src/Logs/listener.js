import WebSocket from 'isomorphic-ws'

export default class LogsListener {
  /**
   * Create a new Application log listener
   * @param {Client} client Scalingo API Client
   * @param {String} url URL to the logs websocket API
   */

  constructor(client, url) {
    let wsURL = new URL(url)
    if(wsURL.protocol == "http:" || wsURL.protocol == "ws:") {
      wsURL.protocol = "ws"
    } else {
      wsURL.protocol = "wss"
    }
    this._client = client
    this._url = wsURL.toString()
    this._onLog = null
    this._start()
  }

  _start() {
    this._ws = new WebSocket(this._url)
    this._ws.onclose = () => {
      this._ws = null
    }
    this._ws.onmessage = (message) => {
      this._onMessage(message)
    }
  }

  /**
   * Close the listener connection
   */
  close() {
    if(this._ws) {
      this._ws.close()
    }
  }

  /**
   * Setup a callback that will be called when a new log line is received
   * @param {function(log: String)} callback Callback to call when a new log line is received
   */
  onLog(callback) {
    this._onLog = callback
  }

  _onMessage(message) {
    let data = JSON.parse(message.data)
    let event = data['event']

    switch(event) {
      case 'log':
        if(this._onLog) {
          this._onLog(data['log'])
        }
        break;
    }
  }
}
