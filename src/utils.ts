/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";

import { APIError } from "./errors";

export interface UnpackOpts {
  hasOperation?: boolean;
}

/**
 * @ignore
 */

export function unpackData(
  axiosRequest: Promise<AxiosResponse>,
  prefix?: string,
  opts?: UnpackOpts,
): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosRequest
      .then((response) => {
        let data = response.data;
        if (prefix !== undefined) {
          data = response.data[prefix];
        }
        if (opts && opts.hasOperation) {
          resolve({ data: data, operation: response.headers.location });
        } else {
          resolve(data);
        }
      })
      .catch((error) => {
        if (error.response) {
          reject(new APIError(error.response.status, error.response.data));
          return;
        } else {
          reject(error);
        }
      });
  });
}
