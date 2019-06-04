import {testGetter, testPost, testUpdate, testDelete, testPut} from '../utils/http.js'
import Environment from '../../src/Environment'

describe("Environment#for", () =>  {
  testGetter("https://api.scalingo.com/v1/apps/tata/variables", "variables", (client) => {
    return new Environment(client).for("tata")
  })
})

describe("Environment#create", () =>  {
  testPost("https://api.scalingo.com/v1/apps/tata/variables",null,{variable: {name: "tata", value: "$toto"}}, "variable", (client) => {
    return new Environment(client).create("tata", {name: "tata", value: "$toto"})
  })
})

describe("Environment#bulkUpdate", () => {
  testPut("https://api.scalingo.com/v1/apps/tata/variables", {variables: [{name: "tata", value: "$toto"}, {name: "tutu", value: "$tete"}]}, "variables", (client) => {
    return new Environment(client).bulkUpdate("tata", [{name: "tata", value: "$toto"}, {name: "tutu", value: "$tete"}])
  })
})

describe("Environment#update", () => {
  testUpdate("https://api.scalingo.com/v1/apps/tata/variables/54101384736f7563d5040000", {variable: {value: "$toto"}}, "variable", (client) => {
    return new Environment(client).update("tata", "54101384736f7563d5040000", "$toto")
  })
})

describe("Environment#destroy", () => {
  testDelete("https://api.scalingo.com/v1/apps/tata/variables/54101384736f7563d5040000", (client) => {
    return new Environment(client).destroy("tata", "54101384736f7563d5040000")
  })
})

describe("Environment#bulkDestroy", () => {
  testDelete("https://api.scalingo.com/v1/apps/tata/variables", (client) => {
    return new Environment(client).bulkDestroy("tata", ["54101384736f7563d5040000", "54101384736f7563d5040001"])
  })
})
