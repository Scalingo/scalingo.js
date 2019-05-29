import {APIError} from "../errors";

export class Operation {
  constructor(client, url) {
    this._client = client
    this._id = null
    this._created_at = null
    this._finished_at = null
    this._status = null
    this._type = null
    this._error = null
    this._url = url
  }
  
  get id() {
    return this._id
  }
  
  get status() {
    return this._status
  }
  
  get created_at() {
    return this._created_at
  }
  
  get finished_at() {
    return this._finished_at
  }
  
  get error() {
    return this._error
  }
  
  get type() {
    return this._type
  }
  
  fillProperties(values) {
    this._id = values.id
    this._created_at = values.created_at
    this._finished_at = values.finished_at
    this._type = values.type
    this._status = values.status
    this._error = values.error
  }
  
  async refresh() {
    return new Promise((resolve, reject) => {
      this._client.apiClient().get(this._url)
        .then(response => {
          this.fillProperties(response.data.operation)
          resolve(response.data.operation)
        }).catch(error => {
        if (error.response) {
          reject(new APIError(error.response.status, error.response.data))
          return
        }
        reject(error)
      })
    })
  }
  
  wait() {
    let vm = this
    return new Promise((resolve, reject) => {
      let waitInterval = setInterval(function () {
        vm.refresh().then(response => {
          if (vm.status === "done") {
            resolve(response.data)
            clearInterval(waitInterval)
          }
        }).catch(error => {
          clearInterval(waitInterval)
          if (error.response) {
            reject(new APIError(error.response.status, error.response.data))
            return
          }
          reject(error)
        })
      }, 1000)
    })
  }
}
