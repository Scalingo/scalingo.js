import WebSocket from "isomorphic-ws";

import { Client } from "..";

export class LogsListener {
  /** Scalingo API Client */
  _client: Client;

  /** URL of the stream to listen to */
  _url: string;

  _ws?: WebSocket | null;

  _onLog?: ((msg: string) => void) | null;

  /**
   * Create a new Application log listener
   * @param client Scalingo API Client
   * @param url URL to the logs websocket API
   */
  constructor(client: Client, url: string) {
    const wsURL = new URL(url);
    if (wsURL.protocol === "http:" || wsURL.protocol === "ws:") {
      wsURL.protocol = "ws";
    } else {
      wsURL.protocol = "wss";
    }
    this._client = client;
    this._url = wsURL.toString();
    this._onLog = null;
    this._start();
  }

  _start(): void {
    this._ws = new WebSocket(this._url);
    this._ws.onclose = (): void => {
      this._ws = null;
    };

    this._ws.onmessage = (message): void => {
      this._onMessage(message);
    };
  }

  /** Close the listener connection */
  close(): void {
    this._ws?.close();
  }

  /**
   * Setup a callback that will be called when a new log line is received
   * @param callback Callback to call when a new log line is received
   */
  onLog(callback: (msg: string) => void): void {
    this._onLog = callback;
  }

  _onMessage(message: WebSocket.MessageEvent): void {
    const data = JSON.parse(message.data.toString());
    const event = data["event"];

    if (event === "log") {
      this._onLog?.(data["log"]);
    }
  }
}

export default LogsListener;
