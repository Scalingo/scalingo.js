const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    // Use the database type version ID (e.g., '69aea6e66e8b2491afad1f8c')
    const versionId = process.env.DATABASE_TYPE_VERSION_ID || '69aea6e66e8b2491afad1f8c'
    return client.Databases.showDatabaseTypeVersion(versionId)
  })
  .then((version) => {
    console.log('Database Type Version Details:')
    console.log('  ID:', version.id)
    console.log('  Database Type ID:', version.database_type_id)
    console.log('  Version:', `${version.major}.${version.minor}.${version.patch}`)
    console.log('  Build:', version.build)
    console.log('  Features:', version.features.join(', '))
    console.log('  Next Upgrade:', version.next_upgrade || 'None')
    console.log('  Allowed Plugins:', version.allowed_plugins ? version.allowed_plugins.join(', ') : 'None')
    console.log('  Created At:', version.created_at)
    console.log('  Updated At:', version.updated_at)
  })
  .catch((err) => {
    console.error(err)
  })
