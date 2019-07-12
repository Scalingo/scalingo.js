import {testGetter, testDelete} from '../utils/http.js'
import Collaborators from '../../src/Collaborators'
import '../factories'

describe('Collaborators#for', () => {
  testGetter('https://api.scalingo.com/v1/apps/toto/collaborators', null, "collaborators", (client) => {
    return new Collaborators(client).for('toto')
  })
})

describe('Collaborators#destroy', () => {
  testDelete('https://api.scalingo.com/v1/apps/toto/collaborators/1234', (client) => {
    return new Collaborators(client).destroy('toto', '1234')
  })
})