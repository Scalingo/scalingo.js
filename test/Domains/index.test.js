import {testGetter, testPost} from '../utils/http.js'
import Domains from '../../src/Domains'

describe("Domains#for", () => {
    testGetter("https://api.scalingo.com/v1/apps/tata/domains", "domains", (client) => {
        return new Domains(client).for("tata")
    })
});

describe("Domains#link", () => {
    testPost("https://api.scalingo.com/v1/apps/tata/domains", { domains: { name: 'nice.one.dude', tlscert: false,  tlskey: false } }, 'domains',(client) => {
        return new Domains(client).link("tata", { name: 'nice.one.dude', tlscert: false,  tlskey: false })
    })
});
