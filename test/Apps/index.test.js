import {testGetter} from '../utils/http.js'
import Apps from '../../src/Apps'

describe('App#all', () => {
  testGetter("https://api.scalingo.com/v1/apps", "apps", (client) => {
    return new Apps(client).all()
  })
})

describe('App#find', () => {
  testGetter("https://api.scalingo.com/v1/apps/toto", "app", (client) => {
    return new Apps(client).find('toto')
  })
})
