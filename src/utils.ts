import { APIError } from './errors'
import { AxiosResponse } from 'axios'

/**
 * @ignore
 */
export function unpackData(
  axiosRequest: Promise<AxiosResponse>,
  prefix?: string,
  opts?: Record<string, any>,
): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosRequest
      .then((response) => {
        let data = response.data
        if (prefix !== undefined) {
          data = response.data[prefix]
        }
        if (opts && opts['hasOperation']) {
          resolve({ data: data, operation: response.headers.location })
        } else {
          resolve(data)
        }
      })
      .catch((error) => {
        if (error.response) {
          reject(new APIError(error.response.status, error.response.data))
          return
        } else {
          reject(error)
        }
      })
  })
}
