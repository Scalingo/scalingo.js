let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Containers.scale("test-dashboard-ichkour", [{
    name: "web",
    size: "S",
    amount: 1
  }])
}).then((app) => {
  console.log(app)
}).catch(e => {
  console.log(e)
})

