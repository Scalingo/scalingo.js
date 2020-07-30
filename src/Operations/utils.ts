import { APIError } from '../errors'
import { Client } from '..'

export class Operation {
  _client: Client | null
  _id?: string | null
  _created_at?: string | null
  _finished_at?: string | null
  _status?: string | null
  _type?: string | null
  _error?: any
  _url?: string | null

  /**
   * @param client Client instance
   * @param url Location url
   * @see https://developers.scalingo.com/operations
   */
  constructor(client: Client, url: string) {
    this._client = client
    this._id = null
    this._created_at = null
    this._finished_at = null
    this._status = null
    this._type = null
    this._error = null
    this._url = url
  }

  get id(): string | null | undefined {
    return this._id
  }

  get status(): string | null | undefined {
    return this._status
  }

  get created_at(): string | null | undefined {
    return this._created_at
  }

  get finished_at(): string | null | undefined {
    return this._finished_at
  }

  get error(): any {
    return this._error
  }

  get type(): string | null | undefined {
    return this._type
  }

  /**
   * Set properties of the Operation object
   * @param values Operation object
   */
  setProperties(values: Partial<Operation>): void {
    this._id = values.id
    this._created_at = values.created_at
    this._finished_at = values.finished_at
    this._type = values.type
    this._status = values.status
    this._error = values.error
  }

  /**
   * Get the response of the API call to get the operation's infos
   */
  async refresh(): Promise<Operation> {
    return new Promise((resolve, reject) => {
      if (!this._client || !this._url) {
        reject(new Error('missing url'))
        return
      }

      this._client
        .apiClient()
        .get(this._url)
        .then((response) => {
          this.setProperties(response.data.operation)
          resolve(response.data.operation)
        })
        .catch((error) => {
          if (error.response) {
            reject(new APIError(error.response.status, error.response.data))
            return
          }
          reject(error)
        })
    })
  }

  /**
   * It will call the refresh method until operation's status isn't 'done'
   */
  wait(): Promise<Operation> {
    return new Promise((resolve, reject) => {
      const waitInterval = setInterval(async () => {
        try {
          const response = (await this.refresh()) as Operation
          if (this.status === 'done') {
            resolve(response)
            clearInterval(waitInterval)
          }
        } catch (error) {
          clearInterval(waitInterval)

          if (error.response) {
            reject(new APIError(error.response.status, error.response.data))
            return
          }

          reject(error)
        }
      }, 1000)
    })
  }
}

export default Operation
