/** @see https://developers.scalingo.com/regions */
export interface Region {
  /** Underscore-cased name of the region */
  name: string;
  /** How the name of the region should be displayed */
  display_name: string;
  /** URL to the regional API managing apps */
  api: string;
  /** URL to the regional API managing databases */
  database_api: string;
  /** URL to the dashboard of the region */
  dashboard: string;
  /** SSH Host to git push application code */
  ssh: string;
  /** Wether this region is the default one*/
  default: boolean;
}
