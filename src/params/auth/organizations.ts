export interface CreateParams {
  /** Name of the organization */
  name: string;
}

export interface UpdateParams {
  /** Name of the organization */
  name?: string;
}

export interface CreateInvitationParams {
  /** Email address of the person to invite */
  email: string;
}

export interface EventsParams {
  /** Page number */
  page?: number;
  /** Items per page */
  per_page?: number;
}
