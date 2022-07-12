import WebSocket from "isomorphic-ws";
export class LogsListener {
    /**
     * Create a new Application log listener
     * @param client Scalingo API Client
     * @param url URL to the logs websocket API
     */
    constructor(client, url) {
        const wsURL = new URL(url);
        if (wsURL.protocol === "http:" || wsURL.protocol === "ws:") {
            wsURL.protocol = "ws";
        }
        else {
            wsURL.protocol = "wss";
        }
        this._client = client;
        this._url = wsURL.toString();
        this._onLog = null;
        this._start();
    }
    _start() {
        this._ws = new WebSocket(this._url);
        this._ws.onclose = () => {
            this._ws = null;
        };
        this._ws.onmessage = (message) => {
            this._onMessage(message);
        };
    }
    /** Close the listener connection */
    close() {
        var _a;
        (_a = this._ws) === null || _a === void 0 ? void 0 : _a.close();
    }
    /**
     * Setup a callback that will be called when a new log line is received
     * @param callback Callback to call when a new log line is received
     */
    onLog(callback) {
        this._onLog = callback;
    }
    _onMessage(message) {
        var _a;
        const data = JSON.parse(message.data.toString());
        const event = data["event"];
        if (event === "log") {
            (_a = this._onLog) === null || _a === void 0 ? void 0 : _a.call(this, data["log"]);
        }
    }
}
export default LogsListener;
//# sourceMappingURL=listener.js.map