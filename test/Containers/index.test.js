import {testGetter, testPost} from '../utils/http.js'
import Containers from '../../src/Containers'

describe('Containers#for', () => {
  testGetter("https://api.scalingo.com/v1/apps/toto/containers", "containers", (client) => {
    return new Containers(client).for("toto")
  })
})

describe('Containers#scale', () => {
  let opts = {
    operation: true,
    location: "https://api.scalingo.com/v1/apps/toto/operations/54100930736f7563d5030000"
  }
  testPost("https://api.scalingo.com/v1/apps/toto/scale", opts, {containers: [{name: "web", amount: 2, size: "M"}]}, "containers", (client) => {
    return new Containers(client).scale("toto", [{name: "web", amount: 2, size: "M"}])
  })
})

describe('Container#availableSizes', () => {
  testGetter("https://api.scalingo.com/v1/features/container_sizes", "container_sizes", (client) => {
    return new Containers(client).availableSizes()
  })
})
