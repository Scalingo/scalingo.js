import {Factory} from 'rosie'

Factory.define('operation')
  .sequence('id', (i) => { return `operation-${i}`})
  .attr('status', 'pending')
  .attr('created_at', new Date().toString())
  .attr('type', 'scale')
