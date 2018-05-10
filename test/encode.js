const { expect } = require('chai')
const { encode, decode } = require('../modules/encode.ts')

describe('encode', () => {
  const name = 'encoding-name'

  describe('encode', () => {
    describe('encode null', () => {
      const value = null
      it('encode null value as an empty string when null format is hidden', () => {
        const opts = {
          nullFormat: 'hidden'
        }
        expect(encode(name, value, opts)).to.equal('')
      })
      it('encode null value as a null string when null format is string', () => {
        const opts = {
          nullFormat: 'string'
        }
        expect(encode(name, value, opts)).to.equal(name + '=null')
      })
    })
    describe('encode boolean', () => {
      const trueValue = true
      const falseValue = false
      it('encode true boolean value as name when boolean format is empty-true', () => {
        const opts = {
          booleanFormat: 'empty-true'
        }
        expect(encode(name, trueValue, opts)).to.equal(name)
      })
      it('encode false boolean value as false string when boolean format is empty-true', () => {
        const opts = {
          booleanFormat: 'empty-true'
        }
        expect(encode(name, falseValue, opts)).to.equal(name + '=false')
      })
      it('encode true boolean value as tick when boolean format is unicode', () => {
        const opts = {
          booleanFormat: 'unicode'
        }
        expect(encode(name, trueValue, opts)).to.equal(name + '=✓')
      })
      it('encode false boolean value as tick when boolean format is unicode', () => {
        const opts = {
          booleanFormat: 'unicode'
        }
        expect(encode(name, falseValue, opts)).to.equal(name + '=✗')
      })
      it('encode true boolean value as true string when boolean format is undefined', () => {
        const opts = {}
        expect(encode(name, trueValue, opts)).to.equal(name + '=true')
      })
      it('encode false boolean value as false string when boolean format is undefined', () => {
        const opts = {}
        expect(encode(name, falseValue, opts)).to.equal(name + '=false')
      })
    })
    describe('encode array', () => {
      const keyValue1 = 'key1=value1'
      const keyValue2 = 'key2=value2'
      const value = [keyValue1, keyValue2]

      it('should encode string with name and index when array format is of type index', () => {
        const opts = {
          arrayFormat: 'index'
        }
        const expectedEncodedValue = name + '[0]=' + encodeURIComponent(keyValue1) + '&' + name + '[1]=' + encodeURIComponent(keyValue2)
        expect(encode(name, value, opts)).to.equal(expectedEncodedValue)
      })
      it('should encode string with name and empty brackets when array format is of type brackets', () => {
        const opts = {
          arrayFormat: 'brackets'
        }
        const expectedEncodedValue = name + '[]=' + encodeURIComponent(keyValue1) + '&' + name + '[]=' + encodeURIComponent(keyValue2)
        expect(encode(name, value, opts)).to.equal(expectedEncodedValue)
      })
      it('should return original name when array format is not defined', () => {
        const opts = {}
        const expectedEncodedValue = name + '=' + encodeURIComponent(keyValue1) + '&' + name + '=' + encodeURIComponent(keyValue2)
        expect(encode(name, value, opts)).to.equal(expectedEncodedValue)
      })
    })
  })
  describe('decode', () => {
    describe('value is undefined', () => {
      const value = undefined
      it('should equal true when boolean format is empty-true', () => {
        const opts = {
          booleanFormat: 'empty-true'
        }
        expect(decode(value, opts)).to.equal(true)
      })
      it('should equal null when boolean format is not empty-true', () => {
        expect(decode(value, {})).to.equal(null)
      })
    })
    describe('boolean format is a string', () => {
      const opts = {
        booleanFormat: 'string'
      }
      it('should equal true when string equals "true"', () => {
        const value = 'true'
        expect(decode(value, opts)).to.equal(true)
      })
      it('should equal false when string equals "false"', () => {
        const value = 'false'
        expect(decode(value, opts)).to.equal(false)
      })
    })
    describe('boolean format is a unicode string', () => {
      const opts = {
        booleanFormat: 'unicode'
      }
      it('should equal true when unicode string equals ✓', () => {
        const value = '✓'
        expect(decode(value, opts)).to.equal(true)
      })
      it('should equal true when unicode string equals ✗', () => {
        const value = '✗'
        expect(decode(value, opts)).to.equal(false)
      })
    })
    describe('null format is a string', () => {
      it('should equal null when value string equals null', () => {
        const opts = {
          nullFormat: 'string'
        }
        const value = 'null'
        expect(decode(value, opts)).to.equal(null)
      })
    })
    it('should uri decode a string when opts is not defined', () => {
      const opts = {}
      const value = 'test%20value'
      expect(decode(value, opts)).to.equal('test value')
    })
  })
})