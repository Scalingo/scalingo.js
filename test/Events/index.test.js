import {testGetter} from '../utils/http.js'
import {testEventsGetter} from "../../src/Events/utils";
import Events from '../../src/Events'

describe("Events#for", () =>  {
  testGetter("https://api.scalingo.com/v1/apps/tata/events", null, null, (client) => {
    return new Events(client).for("tata", {page: 1, from: 2})
  })

  testEventsGetter("https://api.scalingo.com/v1/apps/tata/events", {page: 1, per_page: 2, from: 1},(client) =>  {
    return new Events(client).for("tata", {page: 1, per_page: 2, from: 1})
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
