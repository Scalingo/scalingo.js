import { testGetter } from '../utils/http.js'
import Features from '../../src/Features'

describe('Features#containerSizes', () => {
  testGetter(
    'https://api.scalingo.com/v1/features/container_sizes',
    {},
    'container_sizes',
    (client) => {
      return new Features(client).containerSizes()
    },
  )
})
