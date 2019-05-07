import WebSocket from 'isomorphic-ws'

export default class Listener {
  constructor(client, url) {
    this._client = client
    this._messageTypes = {}
    this._ws = new WebSocket(url)
    this._ws.onopen = () => {
      this._auth()
      if(this._onOpen) {
        this._onOpen()
      }
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
      this._messageTypes[data.type](data.data)
    }
  }

  close() {
    if(this._ws) {
      this._ws.close()
    }
  }

  onOpen(callback) {
    this._onOpen = callback
  }

  onClose(callback) {
    this._onClose = callback
  }

  onNew(callback) {
    this._messageTypes["new"] = callback
  }

  onLog(callback) {
    this._messageTypes["log"] = callback
  }

  onStatus(callback) {
    this._messageTypes["status"] = callback
  }
}
