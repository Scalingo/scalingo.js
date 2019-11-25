import {
  testDelete,
  testGetter,
  testParamsGetter,
  testPost,
} from '../utils/http.js'
import SCMIntegrations from '../../src/SCMIntegrations'

describe('SCMIntegrations#find', () => {
  testGetter(
    'https://auth.scalingo.com/v1/scm_integrations/toto',
    null,
    'scm_integration',
    (client) => {
      return new SCMIntegrations(client).find('toto')
    },
  )
})

describe('SCMIntegrations#all', () => {
  testGetter(
    'https://auth.scalingo.com/v1/scm_integrations',
    null,
    'scm_integrations',
    (client) => {
      return new SCMIntegrations(client).all()
    },
  )
})

describe('SCMIntegrations#create', () => {
  const opts = {
    scm_type: 'gitlab-self-hosted',
    url: 'https://gitlab.example.com',
    access_token: 'abcdef',
  }
  testPost(
    'https://auth.scalingo.com/v1/scm_integrations',
    null,
    { scm_integration: opts },
    'scm_integration',
    (client) => {
      return new SCMIntegrations(client).create(opts)
    },
  )
})

describe('SCMIntegrations#destroy', () => {
  testDelete(
    'https://auth.scalingo.com/v1/scm_integrations/integration-id',
    (client) => {
      return new SCMIntegrations(client).destroy('integration-id')
    },
  )
})

describe('SCMIntegrations#importSSHKeys', () => {
  testPost(
    'https://auth.scalingo.com/v1/scm_integrations/integration-id/import_keys',
    null,
    null,
    'keys',
    (client) => {
      return new SCMIntegrations(client).importSSHKeys('integration-id')
    },
  )
})

describe('SCMIntegrations#searchPullRequests', () => {
  testParamsGetter(
    'https://auth.scalingo.com/v1/scm_integrations/biniou/search_pull_requests',
    { query: 'toto' },
    'pull_requests',
    (client) => {
      return new SCMIntegrations(client).searchPullRequests('biniou', 'toto')
    },
  )
})

describe('SCMIntegrations#searchRepositories', () => {
  testParamsGetter(
    'https://auth.scalingo.com/v1/scm_integrations/biniou/search_repos',
    { query: 'toto' },
    'repositories',
    (client) => {
      return new SCMIntegrations(client).searchRepositories('biniou', 'toto')
    },
  )
})

describe('SCMIntegrations#organizations', () => {
  testGetter(
    'https://auth.scalingo.com/v1/scm_integrations/biniou/orgs',
    null,
    'organizations',
    (client) => {
      return new SCMIntegrations(client).organizations('biniou')
    },
  )
})
