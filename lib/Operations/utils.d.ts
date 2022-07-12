import { Client } from "..";
export declare class Operation {
    _client: Client | null;
    _id?: string | null;
    _created_at?: string | null;
    _finished_at?: string | null;
    _status?: string | null;
    _type?: string | null;
    _error?: unknown;
    _url?: string | null;
    /**
     * @param client Client instance
     * @param url Location url
     * @see https://developers.scalingo.com/operations
     */
    constructor(client: Client, url: string);
    get id(): string | null | undefined;
    get status(): string | null | undefined;
    get created_at(): string | null | undefined;
    get finished_at(): string | null | undefined;
    get error(): unknown;
    get type(): string | null | undefined;
    /**
     * Set properties of the Operation object
     * @param values Operation object
     */
    setProperties(values: Partial<Operation>): void;
    /**
     * Get the response of the API call to get the operation's infos
     */
    refresh(): Promise<Operation>;
    /**
     * It will call the refresh method until operation's status isn't 'done'
     */
    wait(): Promise<Operation>;
}
export default Operation;
//# sourceMappingURL=utils.d.ts.map