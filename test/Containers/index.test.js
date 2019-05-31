import {testGetter, testPost} from '../utils/http.js'
import Containers from '../../src/Containers'

describe('Containers#for', () => {
  testGetter("https://api.scalingo.com/v1/apps/toto/containers", "containers", (client) => {
    return new Containers(client).for("toto")
  })
})

describe('Containers#scale', () => {
  testPost("https://api.scalingo.com/v1/apps/toto/scale", { containers: {name: "web", amount: 2}}, "containers", (client) => {
    return new Containers(client).scale("toto", {name: "web", amount: 2})
  })
})

describe('Container#availableSizes', () => {
  testGetter("https://api.scalingo.com/v1/features/container_sizes", "container_sizes", (client) => {
    return new Containers(client).availableSizes()
  })
})

describe('Container#restart', () => {
  testPost("https://api.scalingo.com/v1/features/container_sizes", "container_sizes", (client) => {
    return new Containers(client).availableSizes()
  })
})
