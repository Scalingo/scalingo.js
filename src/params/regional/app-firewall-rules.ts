export interface CreateParams {
  /** IPv4 CIDR to allow */
  cidr: string;
  /** Optional label describing the rule */
  label?: string;
}
