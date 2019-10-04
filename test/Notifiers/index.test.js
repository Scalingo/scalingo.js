import { testDelete, testGetter, testPost, testUpdate } from '../utils/http'
import Notifiers from '../../src/Notifiers'

describe('Notifiers#for', () => {
  testGetter(
    'https://api.scalingo.com/v1/apps/toto/notifiers',
    null,
    'notifiers',
    (client) => {
      return new Notifiers(client).for('toto')
    },
  )
})

describe('Notifiers#create', () => {
  const notifier = {
    platform_id: '5982f145d48c3600273ef08a',
    active: true,
    name: 'My Custom Webhook',
    type_data: { webhook_url: 'https://myapp.fr/webhook/scalingo' },
  }
  testPost(
    'https://api.scalingo.com/v1/apps/toto/notifiers',
    null,
    {
      notifier: notifier,
    },
    'notifier',
    (client) => {
      return new Notifiers(client).create('toto', notifier)
    },
  )
})

describe('Notifiers#update', () => {
  testUpdate(
    'https://api.scalingo.com/v1/apps/toto/notifiers/54100930736f7563d5030000',
    { notifier: { plan_id: '54100930736f7563d5030000' } },
    'notifier',
    (client) => {
      return new Notifiers(client).update('toto', '54100930736f7563d5030000', {
        plan_id: '54100930736f7563d5030000',
      })
    },
  )
})

describe('Notifiers#destroy', () => {
  testDelete(
    'https://api.scalingo.com/v1/apps/toto/notifiers/54100930736f7563d5030000',
    (client) => {
      return new Notifiers(client).destroy('toto', '54100930736f7563d5030000')
    },
  )
})

describe('Notifiers#test', () => {
  testGetter(
    'https://api.scalingo.com/v1/apps/toto/notifiers/titi/test',
    null,
    null,
    (client) => {
      return new Notifiers(client).test('toto', 'titi')
    },
  )
})

describe('Notifiers#get', () => {
  testGetter(
    'https://api.scalingo.com/v1/apps/toto/notifiers/tata',
    null,
    'notifier',
    (client) => {
      return new Notifiers(client).get('toto', 'tata')
    },
  )
})
