import {testGetter, testPost} from '../utils/http.js'
import Containers from '../../src/Containers'
import {Factory} from 'rosie'
import {expect} from 'chai'
import '../factories'

describe('Containers#for', () => {
  testGetter("https://api.scalingo.com/v1/apps/toto/containers", "containers", (client) => {
    return new Containers(client).for("toto")
  })
})

describe('Containers#scale', () => {
  let postOpts = {
    location: "https://api.scalingo.com/v1/apps/toto/operations/54100930736f7563d5030000"
  }
  testPost("https://api.scalingo.com/v1/apps/toto/scale", postOpts, {containers: [{name: "web", amount: 2, size: "M"}]}, "containers", (client, opts) => {
    if(opts.shouldFail) {
      return new Containers(client).scale("toto", [{name: "web", amount: 2, size: "M"}])
    }
    let operation = Factory.build("operation")
    opts.axios.onGet(postOpts.location).reply(200, {operation: operation})
    return new Promise((resolve, reject) => {
      let promise = new Containers(client).scale("toto", [{name: "web", amount: 2, size: "M"}])
      promise.then((data) => {
        expect(data.operation.id).to.eq(operation.id)
        resolve(data.formation)
      }).catch(reject)
    })
  })
})

describe('Container#availableSizes', () => {
  testGetter("https://api.scalingo.com/v1/features/container_sizes", "container_sizes", (client) => {
    return new Containers(client).availableSizes()
  })
})

describe('Container#restart', () => {
  let postOpts = {
    emptyResponseBody: true,
    location: "https://api.scalingo.com/v1/apps/toto/operations/54100930736f7563d5030000"
  }
  testPost("https://api.scalingo.com/v1/apps/toto/restart", postOpts, {scope: ["web"]}, "scope", (client, opts) => {
    if(opts.shouldFail) {
      return new Containers(client).restart("toto", ["web"])
    }
    let operation = Factory.build("operation")
    opts.axios.onGet(postOpts.location).reply(200, {operation: operation})
    return new Promise((resolve, reject) => {
      new Containers(client).restart("toto", ["web"]).then((data) => {
        expect(data.id).to.eq(operation.id)
        resolve(data)
      }).catch(reject)
    })
  })
})
