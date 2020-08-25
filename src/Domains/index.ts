import { unpackData } from '../utils'
import { Client } from '..'
import { Domain } from '../models/regional/domains'

/** @see https://developers.scalingo.com/domains#link-a-domain-name-to-an-application */
export interface DomainCreateParams {
  /** Hostname you want to add */
  name: string
  /** SSL Certificate you want to associate with the domain */
  tlscert?: string
  /** Private key used to create the SSL certificate */
  tlskey?: string
}

/** @see https://developers.scalingo.com/domains#update-a-domain-name */
export interface DomainUpdateParams {
  /** SSL Certificate you want to associate with the domain */
  tlscert?: string
  /** Private key used to create the SSL certificate */
  tlskey?: string
  /** Set this domain as the canonical domain for this application */
  canonical?: boolean
}

/**
 * Domains API Client
 */
export default class Domains {
  /** Scalingo API Client */
  _client: Client

  /**
   * Create a new "thematic" client
   * @param client Scalingo API Client
   */
  constructor(client: Client) {
    this._client = client
  }

  /**
   * List all the domains of an application
   * @see https://developers.scalingo.com/domains#list-all-the-domains-of-an-application
   * @param appId ID of the app to get domains list
   */
  for(appId: string): Promise<Domain[]> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/domains`),
      'domains',
    )
  }

  /**
   * Link a domain name to a specific application
   * @see https://developers.scalingo.com/domains#link-a-domain-name-to-an-application
   * @param appId ID of the app to post to the specified application
   * @param domain An object of the domain to link
   */
  create(appId: string, domain: DomainCreateParams): Promise<Domain> {
    return unpackData(
      this._client
        .apiClient()
        .post(`/apps/${appId}/domains`, { domain: domain }),
      'domain',
    )
  }

  /**
   * Delete a domain from a specific application
   * @see https://developers.scalingo.com/domains#unlink-a-domain-name-from-an-application
   * @param appId ID of the app to post to the specified application
   * @param domainId ID of the specified domain
   */
  destroy(appId: string, domainId: string): Promise<void> {
    return unpackData(
      this._client.apiClient().delete(`/apps/${appId}/domains/${domainId}`),
    )
  }

  /**
   * Show a specific domain from an application
   * @see https://developers.scalingo.com/domains#show-a-specific-domain-of-an-application
   * @param appId ID of the app to post to the specified application
   * @param domainId ID of the domain name
   */
  show(appId: string, domainId: string): Promise<Domain> {
    return unpackData(
      this._client.apiClient().get(`/apps/${appId}/domains/${domainId}`),
      'domain',
    )
  }

  /**
   * Update a domain from a specific application
   * @see https://developers.scalingo.com/domains#update-a-domain-name
   * @param appId ID of the app to post to the specified application
   * @param domainId ID of the domain to update
   * @param domain An object of the domain to update
   */
  update(
    appId: string,
    domainId: string,
    domain: DomainUpdateParams,
  ): Promise<Domain> {
    return unpackData(
      this._client
        .apiClient()
        .patch(`/apps/${appId}/domains/${domainId}`, { domain: domain }),
      'domain',
    )
  }
}
