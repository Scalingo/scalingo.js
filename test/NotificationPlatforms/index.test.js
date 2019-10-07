import { testGetter } from '../utils/http'
import NotificationPlatforms from '../../src/NotificationPlatforms'

describe('NotificationPlatforms#list', () => {
  testGetter(
    'https://api.scalingo.com/v1/notification_platforms',
    { noAuth: true },
    'notification_platforms',
    (client) => {
      return new NotificationPlatforms(client).list()
    },
  )
})
