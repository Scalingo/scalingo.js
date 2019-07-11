var scalingo =  require("../../dist/scalingo")

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client) => {
  return client.Environment.bulkUpdate("scalingo-js-tests", [{name: "test", value: "$toto"}, {name: "tap", value: "$tete"}])
}).then((domains) => {
  console.log(domains)
});
