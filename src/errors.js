/**
 * Error returned when the Scalingo API return something else than 200
 */
export class APIError extends Error{
  /**
   * Create a new instance of APIError
   * @param {Number} status HTTP status code of the request
   * @param {Object} data Body of the HTTP response (parsed as JSON)
   */
  constructor(status, data) {
    let message = `An error occurred (status=${status})`
    if(data && data.error) {
      message = data.error
    }
    super(message)
    this._status = status
    this._data = data

    // Remove ourself from the stack trace
    Error.captureStackTrace(this, APIError)
  }

  /**
   * HTTP Status code returned by the API
   * @return {Number}
   */
  get status() {
    return this._status
  }

  /**
   * Body of the HTTP response (parsed as JSON)
   * @return {Object}
   */
  get data() {
    return this._data
  }

}
