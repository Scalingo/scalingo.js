import {testGetter} from '../utils/http.js'
import Domains from '../../src/Domains'

describe("Domains#for", () => {
    testGetter("https://api.scalingo.com/v1/apps/tata/domains", "domains", (client) => {
        return new Domains(client).for("tata")
    })
})
