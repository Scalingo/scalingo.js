export declare class APIError extends Error {
    _status: number;
    _data: Record<string, any>;
    /**
     * Create a new instance of APIError
     * @param status HTTP status code of the request
     * @param data Body of the HTTP response (parsed as JSON)
     */
    constructor(status: number, data: Record<string, any>);
    /**
     * HTTP Status code returned by the API
     */
    get status(): number;
    /**
     * Body of the HTTP response (parsed as JSON)
     */
    get data(): Record<string, any>;
}
//# sourceMappingURL=errors.d.ts.map