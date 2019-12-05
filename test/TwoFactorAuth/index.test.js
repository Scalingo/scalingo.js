import { testDelete, testGetter } from '../utils/http.js'
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
  testDelete('https://auth.scalingo.com/v1/client/tfa', (client) => {
    return new TFA(client).disable()
  })
})
