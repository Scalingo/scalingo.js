import {testGetter} from '../utils/http.js'
import Users from '../../src/Users'

describe('Users#self', () => {
  testGetter("https://auth.scalingo.com/v1/users/self", "user", (client) => {
    return new Users(client).self()
  })
})
