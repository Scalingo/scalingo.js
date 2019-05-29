import {APIError} from './errors'
let scalingo  = require('../dist/scalingo')

/**
 * @ignore
 */
export function unpackData(axiosRequest, prefix, opts) {
  return new Promise((resolve, reject) => {
    axiosRequest.then((response) => {
      let hasOperation = false;
      let data = response.data;

      if(prefix !== undefined) {
        data = response.data[prefix]
      }
      if(opts && opts["hasOperation"]) {
        resolve({data: data, operation: response.headers.location})
      }else {
        resolve(data)
      }
    }).catch((error) => {
      if(error.response) {
        reject(new APIError(error.response.status, error.response.data))
        return
      }
      reject(error)
    })
  })
}
