let scalingo = require('../../dist/scalingo.js');

// For database id : 54c6909b61646d0001000000
scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Addons.listProviders("5720bb96736361000d010000")
}).then((providers) => {
  console.log(providers)
}).catch(e => {
  console.log(e)
});
