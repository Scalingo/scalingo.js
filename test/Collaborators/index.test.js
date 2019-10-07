import {
  testGetter,
  testDelete,
  testPost,
  testParamsGetter,
} from '../utils/http.js'
import Collaborators from '../../src/Collaborators'
import '../factories'

describe('Collaborators#for', () => {
  testGetter(
    'https://api.scalingo.com/v1/apps/toto/collaborators',
    null,
    'collaborators',
    (client) => {
      return new Collaborators(client).for('toto')
    },
  )
})

describe('Collaborators#destroy', () => {
  testDelete(
    'https://api.scalingo.com/v1/apps/toto/collaborators/1234',
    (client) => {
      return new Collaborators(client).destroy('toto', '1234')
    },
  )
})

describe('Collaborators#invite', () => {
  testPost(
    'https://api.scalingo.com/v1/apps/toto/collaborators',
    null,
    { collaborator: { email: 'toto@titi.tata' } },
    'collaborator',
    (client) => {
      return new Collaborators(client).invite('toto', 'toto@titi.tata')
    },
  )
})

describe('Collaborators#inviteAccept', () => {
  testParamsGetter(
    'https://api.scalingo.com/v1/apps/collaboration',
    { token: 'toto-accept-token' },
    (client) => {
      return new Collaborators(client).inviteAccept('toto-accept-token')
    },
  )
})
