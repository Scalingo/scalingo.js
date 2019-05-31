import {testGetter, testPostOperation} from '../utils/http.js'
import Containers from '../../src/Containers'

describe('Containers#for', () => {
  testGetter("https://api.scalingo.com/v1/apps/toto/containers", "containers", (client) => {
    return new Containers(client).for("toto")
  })
})

describe('Containers#scale', () => {
  testPostOperation("https://api.scalingo.com/v1/apps/toto/scale", {containers: [{name: "web", amount: 2, size: "M"}]}, "containers", (client) => {
    return new Containers(client).scale("toto", [{name: "web", amount: 2, size: "M"}])
  })
})

describe('Container#availableSizes', () => {
  testGetter("https://api.scalingo.com/v1/features/container_sizes", "container_sizes", (client) => {
    return new Containers(client).availableSizes()
  })
})
