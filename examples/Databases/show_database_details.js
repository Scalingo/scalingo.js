const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    // Use the addon ID (e.g., 'ad-xxxx-xxxx-xxxx')
    const addonId = process.env.ADDON_ID || 'ad-2c3708ee-e4a1-4fe8-a4b0-793b36416794'
    return client.Databases.apiShow(addonId)
  })
  .then((database) => {
    console.log('Database Details:')
    console.log('  ID:', database.id)
    console.log('  App Name:', database.app_name)
    console.log('  Type:', database.type_name)
    console.log('  Plan:', database.plan)
    console.log('  Status:', database.status)
    console.log('  Version:', database.readable_version)
    console.log('  Hostname:', database.hostname)
    console.log('  Cluster:', database.cluster)
    console.log('  Encryption at Rest:', database.encryption_at_rest)
    console.log('  Instances:', database.instances.length)
    database.instances.forEach((instance, i) => {
      console.log(`    Instance ${i + 1}:`)
      console.log('      Type:', instance.type)
      console.log('      Status:', instance.status)
      console.log('      Hostname:', instance.hostname)
      console.log('      Port:', instance.port)
    })
    if (database.postgresql_config) {
      console.log('  PostgreSQL Config:')
      console.log('    TimescaleDB Enabled:', database.postgresql_config.timescaledb_enabled)
    }
    console.log('  Maintenance Window:')
    console.log('    Weekday (UTC):', database.maintenance_window.weekday_utc)
    console.log('    Starting Hour (UTC):', database.maintenance_window.starting_hour_utc)
    console.log('    Duration (hours):', database.maintenance_window.duration_in_hour)
  })
  .catch((err) => {
    console.error(err)
  })
