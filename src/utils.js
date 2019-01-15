import {APIError} from './errors'
/**
 * @ignore
 */
export function unpackData(axiosRequest, prefix) {
  return new Promise((resolve, reject) => {
    axiosRequest.then((response) => {
      if(prefix === null) {
        resolve(response.data)
      } else {
        resolve(response.data[prefix])
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
