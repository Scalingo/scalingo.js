export type OrgType = "company" | "non-profit" | "administration";

export interface HDSContact {
  id: string;
  org_type: OrgType;
  name: string;
  email: string;
  phone_number: string;
  company: string;
  address_line1: string;
  address_line2: string;
  address_city: string;
  address_zip: string;
  address_country: string;
  notes: string;
  updated_at: string;
  up_to_date: boolean;
}
