var scalingo =  require("../../dist/scalingo")

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client) => {
  return client.Environment.create("scalingo-js-tests", {name: "tata", value: "$toto"})
}).then((domains) => {
  console.log(domains)
});
