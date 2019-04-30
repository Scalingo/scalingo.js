import {testGetter, testPost, testUpdate, testDelete} from '../utils/http.js'
import Environment from '../../src/Environment'

describe("Environment#for", () =>  {
  testGetter("https://api.scalingo.com/v1/apps/tata/variables", "variables", (client) => {
    return new Environment(client).for("tata")
  })
})
