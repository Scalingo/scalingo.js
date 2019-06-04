import {testGetter} from '../utils/http.js'
import Operations from '../../src/Operations'

describe('Operations#getOperation', () => {
  testGetter("https://api.scalingo.com/v1/apps/toto/operations/tata", "operation", (client) => {
    return new Operations(client).operation("toto", "tata")
  })
})
