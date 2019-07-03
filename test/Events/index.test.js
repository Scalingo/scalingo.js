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

describe("Events#listEventTypes", () => {
  testGetter("https://api.scalingo.com/v1/event_types", {noAuth: true},  "event_types", (client) => {
    return new Events(client).listEventTypes()
  })
})

describe("Events#listEventCategories", () => {
  testGetter("https://api.scalingo.com/v1/event_categories", {noAuth: true}, "event_categories", (client) => {
    return new Events(client).listEventCategories()
  })
})
