/// <reference types="ws" />
import WebSocket from "isomorphic-ws";
import { Client } from "..";
import { DeploymentStatus } from "../models/regional/deployments";
/** @see https://developers.scalingo.com/deployments#get-real-time-output-of-a-live-deployment */
export interface EventNewDeployment {
    /** ID of the new deployment */
    deployment: string;
}
/** @see https://developers.scalingo.com/deployments#get-real-time-output-of-a-live-deployment */
export interface EventNewDeploymentLog {
    /** Deployment ID */
    id: string;
    /** log line received */
    content: string;
}
/** @see https://developers.scalingo.com/deployments#get-real-time-output-of-a-live-deployment */
export interface EventDeploymentStatusUpdated {
    /** Deployment ID */
    id: string;
    /** New deployment status */
    status: DeploymentStatus;
}
declare type NewDeploymentHandler = (e: EventNewDeployment) => void;
declare type DeploymentLogHandler = (e: EventNewDeploymentLog) => void;
declare type DeploymentStatusHandler = (e: EventDeploymentStatusUpdated) => void;
declare type UnknownHandler = (...args: unknown[]) => void;
export declare type MessageTypes = "new" | "log" | "status";
export interface MessageHandlers {
    new: NewDeploymentHandler[];
    log: DeploymentLogHandler[];
    status: DeploymentStatusHandler[];
    unknown: UnknownHandler[];
}
export interface LifecycleHandlers {
    beforeOpen: (() => void)[];
    onOpen: ((e?: WebSocket.Event) => void)[];
    beforeClose: (() => void)[];
    onClose: ((e?: WebSocket.CloseEvent) => void)[];
}
export default class Listener {
    /** Scalingo API Client */
    readonly client: Client;
    /** URL of the stream to listen to */
    readonly url: string;
    private wsHandlers;
    private lifecycleHandlers;
    private ws;
    /**
     * Create a new deployment listener
     * @param client Scalingo API Client
     * @param url URL of the stream to listen to
     * @param autoStart wether to start the listener right away
     */
    constructor(client: Client, url: string, autoStart?: boolean);
    start(): void;
    /** Close the listener connection */
    close(): void;
    performAuth(): void;
    /** Generic incoming message handling */
    handleMessage(message: WebSocket.MessageEvent): void;
    /**
     * Setup a handler that will be called just before the connection is opened.
     * @param handler handler to call
     */
    beforeOpen(handler: () => void): void;
    /**
     * Setup a handler that will be called when the connection is opened.
     * @param handler handler to call
     */
    onOpen(handler: (e?: WebSocket.Event) => void): void;
    /**
     * Setup a handler that will be called just before the connection is closed.
     * @param handler handler to call
     */
    beforeClose(handler: () => void): void;
    /**
     * Setup a handler that will be called when the connection is closed.
     * @param handler andler to call when the connection is closed
     */
    onClose(handler: (e?: WebSocket.CloseEvent) => void): void;
    /**
     * Setup a handler that will be called when there is a new deployment.
     * @param handler handler to call when there is a new deployment
     */
    onNew(handler: (e: EventNewDeployment) => void): void;
    /**
     * Setup a handler that will be called when a new log line is received.
     * @param handler handler to call when a new log line is received
     */
    onLog(handler: (e: EventNewDeploymentLog) => void): void;
    /**
     * Setup a handler that will be called when the deployment status is updated.
     * @param handler handler to call when the deployment status is updated
     */
    onStatus(handler: (e: EventDeploymentStatusUpdated) => void): void;
}
export {};
//# sourceMappingURL=listener.d.ts.map