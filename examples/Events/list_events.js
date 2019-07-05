let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Events.for("test-dashboard-ichkour", {page: 1, per_page: 2})
}).then((events) => {
  console.log(events)
}).catch(e => {
  console.log("error", e)
})
