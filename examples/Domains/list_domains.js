let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
    return client.Domains.for("documentation-service")
}).then((domains) => {
    console.log(domains)
})
