import {testGetter, testPost} from '../utils/http.js'
import Apps from '../../src/Apps'
import {expect} from 'chai'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {Client} from '../../src'

describe('App#all', () => {
  testGetter("https://api.scalingo.com/v1/apps", "apps", (client) => {
    return new Apps(client).all()
  })
})

describe('App#find', () => {
  testGetter("https://api.scalingo.com/v1/apps/toto", "app", (client) => {
    return new Apps(client).find('toto')
  })
})

describe('App#create', () => {
  describe('With a simple request', () => {
    testPost('https://api.scalingo.com/v1/apps', {app: {name: "testApp"}}, "app", (client) => {
      return new Apps(client).create("testApp")
    })
  })

  describe('Using custom params', () => {
    testPost('https://api.scalingo.com/v1/apps', {app: {name: "testApp", git_source: "https://github.com/test/test", stack_id: "abcdef", parent_id: "abcdef1234"}}, "app", (client) => {
      return new Apps(client).create("testApp", {git_source: "https://github.com/test/test", stack_id: "abcdef", parent_id: "abcdef1234"})
    })
  })

  describe('Using the dry_run param', async () => {
    let client = new Client("test-token")
    let mock = new MockAdapter(axios)

    mock.onPost("https://api.scalingo.com/v1/apps").reply(200, {
      app: {
        name: "testApp"
      }
    })
    await new Apps(client).create("testApp", {dry_run: true})
    expect(mock.history.post[0].headers["X-Dry-Run"]).to.eq("true")
  })
})
