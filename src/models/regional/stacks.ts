/** @see https://developers.scalingo.com/stacks */
export interface Stack {
  id: string;
  name: string;
  base_image: string;
  default: boolean;
  created_at: string;
  description: string | null;
  deprecated_at: string | null;
}
