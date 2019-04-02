import {testGetter, testPost} from '../utils/http.js'
import Domains from '../../src/Domains'

describe("Domains#for", () => {
    testGetter("https://api.scalingo.com/v1/apps/tata/domains", "domains", (client) => {
        return new Domains(client).for("tata")
    })
});

describe("Domains#create", () => {
    testPost("https://api.scalingo.com/v1/apps/tata/domains", { domain: { name: 'nice.one.dude', tlscert: null,  tlskey: null } }, 'domains',(client) => {
        return new Domains(client).create("tata", { name: 'nice.one.dude', tlscert: null,  tlskey: null })
    })
});
