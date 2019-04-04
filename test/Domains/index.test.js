import {testGetter, testPost} from '../utils/http.js'
import Domains from '../../src/Domains'
import {testDelete} from "../utils/http";

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

describe("Domains#destroy", () => {
    testDelete("https://api.scalingo.com/v1/apps/tata/domains/541067ec736f7504a5110000", (client) => {
        return new Domains(client).destroy("tata", "541067ec736f7504a5110000")
    })
});

describe("Domains#show", () => {
    testGetter("https://api.scalingo.com/v1/apps/tata/domains/541067ec736f7504a5110000", "domain", (client) => {
        return new Domains(client).show("tata", "541067ec736f7504a5110000")
    })
});
