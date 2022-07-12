/// <reference types="ws" />
import WebSocket from "isomorphic-ws";
import { Client } from "..";
export declare class LogsListener {
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
    constructor(client: Client, url: string);
    _start(): void;
    /** Close the listener connection */
    close(): void;
    /**
     * Setup a callback that will be called when a new log line is received
     * @param callback Callback to call when a new log line is received
     */
    onLog(callback: (msg: string) => void): void;
    _onMessage(message: WebSocket.MessageEvent): void;
}
export default LogsListener;
//# sourceMappingURL=listener.d.ts.map