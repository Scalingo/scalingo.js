import WebSocket from "isomorphic-ws";
function knownMessageType(str) {
    return ["new", "log", "status"].includes(str);
}
export default class Listener {
    /**
     * Create a new deployment listener
     * @param client Scalingo API Client
     * @param url URL of the stream to listen to
     * @param autoStart wether to start the listener right away
     */
    constructor(client, url, autoStart = true) {
        this.wsHandlers = {
            new: [],
            log: [],
            status: [],
            unknown: [],
        };
        this.lifecycleHandlers = {
            beforeOpen: [],
            onOpen: [],
            beforeClose: [],
            onClose: [],
        };
        this.client = client;
        this.url = url;
        // Auth on login
        this.onOpen(() => this.performAuth());
        if (autoStart) {
            this.start();
        }
    }
    start() {
        // Before opening
        for (const callback of this.lifecycleHandlers.beforeOpen) {
            callback();
        }
        this.ws = new WebSocket(this.url);
        this.ws.onopen = (e) => {
            for (const callback of this.lifecycleHandlers.onOpen) {
                callback(e);
            }
        };
        this.ws.onclose = (e) => {
            for (const callback of this.lifecycleHandlers.onClose) {
                callback(e);
            }
            this.ws = null;
        };
        this.ws.onmessage = (message) => {
            this.handleMessage(message);
        };
    }
    /** Close the listener connection */
    close() {
        var _a;
        // Before opening
        for (const callback of this.lifecycleHandlers.beforeClose) {
            callback();
        }
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.close();
        this.ws = null;
    }
    performAuth() {
        var _a;
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({
            type: "auth",
            data: {
                token: this.client._token,
            },
        }));
    }
    /** Generic incoming message handling */
    handleMessage(message) {
        const data = JSON.parse(message.data.toString());
        const type = data.type;
        if (knownMessageType(type) && this.wsHandlers[type]) {
            const result = data.data;
            // If there was an ID in the original message
            if (data.id) {
                // Inject it in the result object
                result.id = data.id;
            }
            for (const callback of this.wsHandlers[type]) {
                callback(result);
            }
        }
        else {
            for (const callback of this.wsHandlers.unknown) {
                callback(data);
            }
        }
    }
    // Lifecycle handlers
    /**
     * Setup a handler that will be called just before the connection is opened.
     * @param handler handler to call
     */
    beforeOpen(handler) {
        this.lifecycleHandlers.beforeOpen.push(handler);
    }
    /**
     * Setup a handler that will be called when the connection is opened.
     * @param handler handler to call
     */
    onOpen(handler) {
        this.lifecycleHandlers.onOpen.push(handler);
    }
    /**
     * Setup a handler that will be called just before the connection is closed.
     * @param handler handler to call
     */
    beforeClose(handler) {
        this.lifecycleHandlers.beforeClose.push(handler);
    }
    /**
     * Setup a handler that will be called when the connection is closed.
     * @param handler andler to call when the connection is closed
     */
    onClose(handler) {
        this.lifecycleHandlers.onClose.push(handler);
    }
    /**
     * Setup a handler that will be called when there is a new deployment.
     * @param handler handler to call when there is a new deployment
     */
    onNew(handler) {
        this.wsHandlers.new.push(handler);
    }
    /**
     * Setup a handler that will be called when a new log line is received.
     * @param handler handler to call when a new log line is received
     */
    onLog(handler) {
        this.wsHandlers.log.push(handler);
    }
    /**
     * Setup a handler that will be called when the deployment status is updated.
     * @param handler handler to call when the deployment status is updated
     */
    onStatus(handler) {
        this.wsHandlers.status.push(handler);
    }
}
//# sourceMappingURL=listener.js.map