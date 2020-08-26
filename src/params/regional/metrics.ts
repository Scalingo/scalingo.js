export interface QueryParams {
  /** Number of hours requested (max 71) */
  since?: number
  /** Only available when requesting router metrics. One of the following: [all, 1XX, 2XX, 3XX, 4XX, 5XX] */
  statusCode?: string
  /** Only available when requesting requests metrics. One of the following: [media, p95, p99] */
  statisticsType?: string
  /** Container type filter */
  containerType?: string
  /** Container index (only available when containerType is set and for non router metrics) */
  containerIndex?: number
  /** only fetch the last metrics */
  last?: boolean
}
