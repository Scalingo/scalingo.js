import { expect } from 'chai'
import { unpackData } from '../src/utils.js'
import { APIError } from '../src/errors'

describe('unpackData', () => {
  it('should reolve correcty if the request resolve', (done) => {
    unpackData(
      new Promise((resolve) => {
        resolve({ data: { test: 'value' } })
      }),
      'test',
    ).then((data) => {
      expect(data).to.eq('value')
      done()
    })
  })

  it('should send an APIError if we had a response', (done) => {
    unpackData(
      new Promise((resolve, reject) => {
        reject({ response: { status: 200, data: { error: 'value' } } })
      }),
      'test',
    ).catch((error) => {
      expect(error).to.be.an.instanceOf(APIError)
      done()
    })
  })

  it('should send a generic error if we had no response', (done) => {
    unpackData(
      new Promise((resolve, reject) => {
        reject(new Error('Toto'))
      }),
      'test',
    ).catch((error) => {
      expect(error).to.not.be.an.instanceOf(APIError)
      expect(error).to.be.an.instanceOf(Error)
      done()
    })
  })
})
