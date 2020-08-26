export interface IndexParams {
  /** Page number */
  page?: number
  /** Items per page */
  per_page?: number
  /** The N last hours - min: 1 max: 72 */
  from?: number
}
