const scalingo = require('../../dist/scalingo.js')

const client = new scalingo.Client()

client.Tokens.exchange(process.env.SCALINGO_TOKEN).then((result) => {
  console.log(result)
})
