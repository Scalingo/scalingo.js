let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
    return client.Domains.destroy("scalingo-js-tests", "5cb0535400de8f000f5959ae")
}).then((domains) => {
    console.log(domains)
}).catch(e => {
    console.log("Status code =>", e._status);
    console.log("Response =>", e._data);
})
