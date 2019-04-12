let scalingo = require('../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
    return client.Domains.show("scalingo-js-tests", "5cb0467bb18a470010a6e0b1")
}).then((domains) => {
    console.log(domains);
}).catch(e => {
    console.log("Status code =>", e._status);
    console.log("Response =>", e._data);
})
