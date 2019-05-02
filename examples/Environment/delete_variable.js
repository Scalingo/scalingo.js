let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Environment.destroy("scalingo-js-tests", "5cc81914623d3a000eb21d3e")
}).then((domains) => {
  console.log(domains)
});
