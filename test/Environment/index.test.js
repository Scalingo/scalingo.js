import {testGetter, testPost, testUpdate, testDelete} from '../utils/http.js'
import Environment from '../../src/Environment'

describe("Environment#for", () =>  {
  testGetter("https://api.scalingo.com/v1/apps/tata/variables", "variables", (client) => {
    return new Environment(client).for("tata")
  })
})

describe("Environment#create", () =>  {
  testPost("https://api.scalingo.com/v1/apps/tata/variables",{variable: {name: "tata", value: "$toto"}}, "variable", (client) => {
    return new Environment(client).create("tata", {name: "tata", value: "$toto"})
  })
})
