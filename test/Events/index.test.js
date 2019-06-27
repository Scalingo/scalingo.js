import {testGetter} from '../utils/http.js'
import Events from '../../src/Events'

describe("Events#for", () =>  {
  testGetter("https://api.scalingo.com/v1/apps/tata/events?from=2", null, null, (client) => {
    return new Events(client).for("tata", 2)
  })
  testGetter("https://api.scalingo.com/v1/apps/tata/events", null, null, (client) => {
    return new Events(client).for("tata")
  })
})

describe("Events#forUser", () => {
  testGetter("https://api.scalingo.com/v1/events", null, null, (client) => {
    return new Events(client).forUser()
  })
})
