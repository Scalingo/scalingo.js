import { testDelete, testGetter, testPost } from '../utils/http.js'
import TFA from '../../src/TwoFactorAuth'

describe('TwoFactorAuth#status', () => {
  testGetter(
    'https://auth.scalingo.com/v1/client/tfa',
    null,
    'tfa',
    (client) => {
      return new TFA(client).status()
    },
  )
})

describe('TwoFactorAuth#disable', () => {
  const expectedBody = { tfa: { id: 23, provider: 'totp' } }

  testPost(
    'https://auth.scalingo.com/v1/client/tfa',
    null,
    expectedBody,
    'tfa',
    (client) => {
      return new TFA(client).initiate(23)
    },
  )
})

describe('TwoFactorAuth#validate', () => {
  const expectedBody = { tfa: { attempt: 5223 } }

  testPost(
    'https://auth.scalingo.com/v1/client/tfa/validate',
    null,
    expectedBody,
    'tfa',
    (client) => {
      return new TFA(client).validate(5223)
    },
  )
})

describe('TwoFactorAuth#disable', () => {
  testDelete('https://auth.scalingo.com/v1/client/tfa', (client) => {
    return new TFA(client).disable()
  })
})
