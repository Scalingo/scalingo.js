let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Logs.listenerFor("sample-go-martini")
}).then((logListener) => {
  logListener.onLog((log) => {
    console.log(log)
  })
})
