import { AxiosResponse } from "axios";
export interface UnpackOpts {
    hasOperation?: boolean;
}
/**
 * @ignore
 */
export declare function unpackData(axiosRequest: Promise<AxiosResponse>, prefix?: string, opts?: UnpackOpts): Promise<any>;
//# sourceMappingURL=utils.d.ts.map