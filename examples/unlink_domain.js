let scalingo = require('../dist/scalingo');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client) => {
    return client.Domains.destroy("test-dashboard-ichkour", "5ca60be800de8f000f45b6f3")
}).then((domains) => {
    console.log(domains)
});
