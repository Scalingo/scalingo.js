let scalingo = require('../../dist/scalingo.js');

// For database id : 54c6909b61646d0001000000
scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Addons.listProviders("54c6909b61646d0001000000")
}).then((providers) => {
  providers.forEach(function (elem) {
    console.log(elem.id)
  })
});
