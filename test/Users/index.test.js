import { testGetter, testPut } from '../utils/http.js'
import Users from '../../src/Users'

describe('Users#self', () => {
  testGetter(
    'https://auth.scalingo.com/v1/users/self',
    null,
    'user',
    (client) => {
      return new Users(client).self()
    },
  )
})

describe('Users#updateAccount', () => {
  testPut(
    'https://auth.scalingo.com/v1/users/account',
    { user: { company: 'New company' } },
    'user',
    (client) => {
      return new Users(client).updateAccount({
        company: 'New company',
      })
    },
  )
})
