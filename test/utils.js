const { expect } = require('chai')
const { getSearch, isSerialisable, parseName } = require('../modules/utils.ts')

describe('utils', () => {
  describe('getSearch', () => {
    it('should return path when there is no search param', () => {

    })
    it('should return search param from path when search param exists', () => {

    })
  })
  describe('isSerialisable', () => {
    it('should not be serialisable when value is undefined', () => {

    })
    it('should not be serialisable when value is undefined', () => {

    })
  })
  describe('parseName', () => {
    const name = 'name'
    it('should parse name when bracket exist', () => {
      expect(parseName(name + '[')).to.eql({
        hasBrackets: true,
        name
      })
    })
    it('should return name when brackets do not exist', () => {
      expect(parseName(name)).to.eql({
        hasBrackets: false,
        name
      })
    })
  })
})