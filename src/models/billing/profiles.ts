export interface BillingProfile {
  id: string
  name: string
  email?: string
  credit?: string
  address_line1: string
  address_line2?: string
  address_zip: string
  address_city: string
  address_state?: string
  address_country: string
  vat_number?: string
  company?: string
  payment_method?: string
  stripe_payment_method?: StripePaymentMethod
  paypal_payment_method?: PaypalPaymentMethod
}

export interface StripePaymentMethod {
  id: string
  default_card_last4?: string
  default_card_exp?: string
  default_card_brand?: string
  default_card_name?: string
  sepa_bank_code?: string
  sepa_country?: string
  sepa_last4?: string
  sepa_mandate_reference?: string
  sepa_mandate_url?: string
}

export interface PaypalPaymentMethod {
  id: string
}
