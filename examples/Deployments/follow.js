const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Apps.deploymentListener('sample-go-martini')
  })
  .then((listener) => {
    listener.onOpen(function() {
      console.log('Connection opened')
    })
    listener.onClose(function() {
      console.log('Connection closed')
    })

    listener.onStatus(function(status) {
      console.log('New status', status)
    })

    listener.onLog(function(log) {
      console.log('New log', log)
    })

    listener.onNew(function(d) {
      console.log('New new', d)
    })
  })
