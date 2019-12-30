import { parse, omit, build, keep } from '../src'

describe('search-params', () => {
  describe('parse', () => {
    it('should parse a querystring to a list of params', () => {
      expect(parse('users=t&role=admin')).toEqual({
        users: 't',
        role: 'admin'
      })
    })

    it('should be typable with a custom type', () => {
      interface Params {
        users: 'string'
        role: string
      }

      expect(parse<Params>('users=t&role=admin')).toEqual({
        users: 't',
        role: 'admin'
      })
    })

    it('should handle multiple parameters with the same name', () => {
      expect(parse('users=t&role=admin&role=moderator')).toEqual({
        users: 't',
        role: ['admin', 'moderator']
      })
    })

    it('should parse booleans correctly', () => {
      expect(parse('istrue=✓&isfalse=✗', { booleanFormat: 'unicode' })).toEqual(
        {
          istrue: true,
          isfalse: false
        }
      )

      expect(
        parse('istrue=true&isfalse=false', { booleanFormat: 'string' })
      ).toEqual({
        istrue: true,
        isfalse: false
      })

      expect(
        parse('istrue&isfalse=false', { booleanFormat: 'empty-true' })
      ).toEqual({
        istrue: true,
        isfalse: 'false'
      })

      expect(parse('istrue=true&isfalse=false')).toEqual({
        istrue: 'true',
        isfalse: 'false'
      })
    })

    it('should parse arrays correctly', () => {
      expect(parse('role[]=member')).toEqual({
        role: ['member']
      })

      expect(parse('role[0]=member')).toEqual({
        role: ['member']
      })

      expect(parse('role[]=member&role[]=admin')).toEqual({
        role: ['member', 'admin']
      })

      expect(parse('role[0]=member&role[1]=admin')).toEqual({
        role: ['member', 'admin']
      })

      expect(parse('role=member&role=admin')).toEqual({
        role: ['member', 'admin']
      })

      expect(
        parse('role=member&role=null', {
          booleanFormat: 'string',
          nullFormat: 'string'
        })
      ).toEqual({
        role: ['member', null]
      })

      expect(
        parse('role=member&role=true', {
          booleanFormat: 'string'
        })
      ).toEqual({
        role: ['member', true]
      })
    })

    it('should parse null values correctly', () => {
      expect(parse('role')).toEqual({
        role: null
      })

      expect(parse('role')).toEqual({
        role: null
      })
    })
  })

  describe('omit', () => {
    it('should remove parameters from search', () => {
      expect(omit('users=t&role=admin', ['role'])).toEqual({
        removedParams: {
          role: 'admin'
        },
        querystring: 'users=t'
      })
    })

    it('should omit all supplied parameters', () => {
      expect(omit('users=t&role=admin', ['users', 'role'])).toEqual({
        removedParams: {
          users: 't',
          role: 'admin'
        },
        querystring: ''
      })
    })
  })

  describe('keep', () => {
    it('should keep parameters from search', () => {
      expect(keep('users=t&role=admin', ['role'])).toEqual({
        keptParams: {
          role: 'admin'
        },
        querystring: 'role=admin'
      })
    })

    it('should omit all supplied parameters', () => {
      expect(omit('users=t&role=admin', ['users', 'role'])).toEqual({
        removedParams: {
          users: 't',
          role: 'admin'
        },
        querystring: ''
      })
    })
  })

  describe('build', () => {
    it('should build a querystring from a parameters', () => {
      expect(
        build({
          model: undefined,
          type: null,
          electric: true,
          gearbox: ''
        })
      ).toBe('type&electric=true&gearbox=')
    })

    it('should be typable with a custom type', () => {
      interface Params {
        electric: boolean
        type: string
      }

      expect(
        build<Params>({
          type: 'city',
          electric: true
        })
      ).toBe('type=city&electric=true')
    })

    it('should build booleans correctly', () => {
      expect(
        build(
          {
            istrue: true,
            isfalse: false
          },
          {
            booleanFormat: 'none'
          }
        )
      ).toBe('istrue=true&isfalse=false')

      expect(
        build(
          {
            istrue: true,
            isfalse: false
          },
          {
            booleanFormat: 'empty-true'
          }
        )
      ).toBe('istrue&isfalse=false')

      expect(
        build(
          {
            istrue: true,
            isfalse: false
          },
          {
            booleanFormat: 'string'
          }
        )
      ).toBe('istrue=true&isfalse=false')

      expect(
        build(
          {
            istrue: true,
            isfalse: false
          },
          {
            booleanFormat: 'unicode'
          }
        )
      ).toBe('istrue=✓&isfalse=✗')
    })

    it('should properly stringify arrays', () => {
      expect(
        build(
          {
            role: ['member', 'admin']
          },
          {
            arrayFormat: 'brackets'
          }
        )
      ).toBe('role[]=member&role[]=admin')

      expect(
        build(
          {
            role: ['member', 'admin']
          },
          {
            arrayFormat: 'index'
          }
        )
      ).toBe('role[0]=member&role[1]=admin')

      expect(
        build({
          role: ['member', 'admin']
        })
      ).toBe('role=member&role=admin')
    })

    it('should build undefined values correctly', () => {
      expect(
        build(
          {
            role: undefined,
            abc: '123'
          },
          {
            nullFormat: 'hidden'
          }
        )
      ).toBe('abc=123')
    })

    it('should build null values correctly', () => {
      expect(
        build({
          role: null
        })
      ).toBe('role')

      expect(
        build(
          {
            role: null
          },
          {
            nullFormat: 'string'
          }
        )
      ).toBe('role=null')

      expect(
        build(
          {
            role: null,
            abc: '123'
          },
          {
            nullFormat: 'hidden'
          }
        )
      ).toBe('abc=123')
    })
  })
})
