/** @see https://developers.scalingo.com/environment#add-environment-variables-to-an-app */
export interface CreateParams {
  /** Name of the variable to create */
  name: string;
  /** Value of the variable */
  value: string;
}

export type UpdateParams = string;

export type BulkUpdateParams = CreateParams[];
