/** @see https://developers.scalingo.com/index#pagination */
export interface PaginationMeta {
  /** Previous page number */
  prev_page?: number;
  /** Current page number */
  current_page: number;
  /** Next page number */
  next_page?: number;
  /** Total amout of pages */
  total_pages: number;
  /** Total amount of items in the collection */
  total_count: number;
}

/** @see https://developers.scalingo.com/index#pagination */
export interface PaginationOpts {
  /** Page number */
  page?: number;
  /** Items per page */
  per_page?: number;
}
