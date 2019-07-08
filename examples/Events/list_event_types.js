let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Events.listEventTypes()
}).then((events) => {
  console.log(events)
}).catch(e => {
  console.log("error", e)
})
