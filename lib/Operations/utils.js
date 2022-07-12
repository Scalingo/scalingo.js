import { APIError } from "../errors";
export class Operation {
    /**
     * @param client Client instance
     * @param url Location url
     * @see https://developers.scalingo.com/operations
     */
    constructor(client, url) {
        this._client = client;
        this._id = null;
        this._created_at = null;
        this._finished_at = null;
        this._status = null;
        this._type = null;
        this._error = null;
        this._url = url;
    }
    get id() {
        return this._id;
    }
    get status() {
        return this._status;
    }
    get created_at() {
        return this._created_at;
    }
    get finished_at() {
        return this._finished_at;
    }
    get error() {
        return this._error;
    }
    get type() {
        return this._type;
    }
    /**
     * Set properties of the Operation object
     * @param values Operation object
     */
    setProperties(values) {
        this._id = values.id;
        this._created_at = values.created_at;
        this._finished_at = values.finished_at;
        this._type = values.type;
        this._status = values.status;
        this._error = values.error;
    }
    /**
     * Get the response of the API call to get the operation's infos
     */
    async refresh() {
        return new Promise((resolve, reject) => {
            if (!this._client || !this._url) {
                reject(new Error("missing url"));
                return;
            }
            this._client
                .apiClient()
                .get(this._url)
                .then((response) => {
                this.setProperties(response.data.operation);
                resolve(response.data.operation);
            })
                .catch((error) => {
                if (error.response) {
                    reject(new APIError(error.response.status, error.response.data));
                    return;
                }
                reject(error);
            });
        });
    }
    /**
     * It will call the refresh method until operation's status isn't 'done'
     */
    wait() {
        return new Promise((resolve, reject) => {
            const waitInterval = setInterval(async () => {
                try {
                    const response = (await this.refresh());
                    if (this.status === "done") {
                        resolve(response);
                        clearInterval(waitInterval);
                    }
                }
                catch (error) {
                    clearInterval(waitInterval);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const axiosError = error;
                    if (axiosError.response) {
                        reject(new APIError(axiosError.response.status, axiosError.response.data));
                        return;
                    }
                    reject(error);
                }
            }, 1000);
        });
    }
}
export default Operation;
//# sourceMappingURL=utils.js.map