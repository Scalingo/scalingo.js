import {testGetter} from '../utils/http.js'
import Events from '../../src/Events'

describe("Events#for", () =>  {
  testGetter("https://api.scalingo.com/v1/apps/tata/events", null, null, (client) => {
    return new Events(client).for("tata", {page: 1, from: 2})
  })

  testGetter("https://api.scalingo.com/v1/apps/tata/events", null, null, (client) => {
    return new Events(client).for("tata", {page:4, per_page:11})
  })

  testGetter("https://api.scalingo.com/v1/apps/tata/events", null, null, (client) => {
    return new Events(client).for("tata", {from:4, per_page:11})
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
