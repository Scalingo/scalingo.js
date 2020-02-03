/**
 * Error returned when the Scalingo API return something else than 200
 */
class GenericError extends Error {}

export class APIError extends Error {
  _status: number
  _data: Record<string, any>

  /**
   * Create a new instance of APIError
   * @param status HTTP status code of the request
   * @param data Body of the HTTP response (parsed as JSON)
   */
  constructor(status: number, data: Record<string, any>) {
    let message = `An error occurred (status=${status})`
    if (data?.error) {
      message = data.error
    }
    super(message)
    this._status = status
    this._data = data

    // Remove ourself from the stack trace
    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, APIError)
    } else {
      // Error's constructor type is `never` which would prevent us from doing this.
      // Working around that issue by inheriting.

      this.stack = new GenericError(
        this._status.toString() + this._data.toString(),
      ).stack
    }

    // Set the prototype explicitly.
    // Cf https://github.com/microsoft/TypeScript-wiki/blob/10f3d49458293333b77766f84510aeaf9dd17d57/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, APIError.prototype)
  }

  /**
   * HTTP Status code returned by the API
   */
  get status(): number {
    return this._status
  }

  /**
   * Body of the HTTP response (parsed as JSON)
   */
  get data(): Record<string, any> {
    return this._data
  }
}
