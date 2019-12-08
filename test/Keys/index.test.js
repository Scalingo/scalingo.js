import { testGetter, testPost, testDelete } from '../utils/http.js'
import Keys from '../../src/Keys'

describe('Keys#all', () => {
  testGetter('https://api.scalingo.com/v1/keys', null, 'keys', (client) => {
    return new Keys(client).all()
  })
})

describe('Keys#show', () => {
  testGetter(
    'https://api.scalingo.com/v1/keys/some-key-id',
    null,
    'key',
    (client) => {
      return new Keys(client).show('some-key-id')
    },
  )
})

describe('Keys#create', () => {
  const expectedBody = {
    name: 'Key name',
    content: 'Key content',
  }

  testPost(
    'https://api.scalingo.com/v1/keys',
    null,
    expectedBody,
    'key',
    (client) => {
      return new Keys(client).create('Key name', 'Key content')
    },
  )
})

describe('Keys#destroy', () => {
  testDelete('https://api.scalingo.com/v1/keys/some-key-id', (client) => {
    return new Keys(client).destroy('some-key-id')
  })
})
