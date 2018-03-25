const { expect } = require('chai')
const { parse, omit, build, keep } = require('../modules/index.ts')

describe('search-params', () => {
    describe('parse', () => {
        it('should parse a querystring to a list of params', () => {
            expect(parse('users=t&role=admin')).to.eql({
                users: 't',
                role: 'admin'
            })
        })

        it('should handle multiple parameters with the same name', () => {
            expect(parse('users=t&role=admin&role=moderator')).to.eql({
                users: 't',
                role: ['admin', 'moderator']
            })
        })

        it('should parse booleans correctly', () => {
            expect(parse('istrue=✓&isfalse=✗', { booleanFormat: 'unicode' })).to.eql({
                istrue: true,
                isfalse: false
            })

            expect(parse('istrue=true&isfalse=false', { booleanFormat: 'string' })).to.eql({
                istrue: true,
                isfalse: false
            })

            expect(parse('istrue&isfalse=false', { booleanFormat: 'empty-true' })).to.eql({
                istrue: true,
                isfalse: 'false'
            })

            expect(parse('istrue=true&isfalse=false')).to.eql({
                istrue: 'true',
                isfalse: 'false'
            })
        })

        it('should parse arrays correctly', () => {
            expect(parse('role[]=member')).to.eql({
                role: ['member']
            })

            expect(parse('role[0]=member')).to.eql({
                role: ['member']
            })

            expect(parse('role[]=member&role[]=admin')).to.eql({
                role: ['member', 'admin']
            })

            expect(parse('role[0]=member&role[1]=admin')).to.eql({
                role: ['member', 'admin']
            })

            expect(parse('role=member&role=admin')).to.eql({
                role: ['member', 'admin']
            })
        })

        it('should parse null values correctly', () => {
            expect(parse('role')).to.eql({
                role: null
            })

            expect(parse('role')).to.eql({
                role: null
            })
        })
    })

    describe('omit', () => {
        it('should remove parameters from search', () => {
            expect(omit('users=t&role=admin', ['role'])).to.eql({
                removedParams: {
                    role: 'admin'
                },
                querystring: 'users=t'
            })
        })

        it('should omit all supplied parameters', () => {
            expect(omit('users=t&role=admin', ['users', 'role'])).to.eql({
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
            expect(keep('users=t&role=admin', ['role'])).to.eql({
                keptParams: {
                    role: 'admin'
                },
                querystring: 'role=admin'
            })
        })

        it('should omit all supplied parameters', () => {
            expect(omit('users=t&role=admin', ['users', 'role'])).to.eql({
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
            ).to.equal('type&electric=true&gearbox=')
        })

        it('should build booleans correctly', () => {
            expect(build({
                istrue: true,
                isfalse: false
            }, {
                booleanFormat: 'none'
            })).to.equal('istrue=true&isfalse=false')

            expect(build({
                istrue: true,
                isfalse: false
            }, {
                booleanFormat: 'empty-true'
            })).to.equal('istrue&isfalse=false')

            expect(build({
                istrue: true,
                isfalse: false
            }, {
                booleanFormat: 'string'
            })).to.equal('istrue=true&isfalse=false')

            expect(build({
                istrue: true,
                isfalse: false
            }, {
                booleanFormat: 'unicode'
            })).to.equal('istrue=✓&isfalse=✗')
        })

        it('should properly stringify arrays', () => {
            expect(
                build({
                    role: ['member', 'admin']
                }, {
                    arrayFormat: 'brackets'
                })
            ).to.equal('role[]=member&role[]=admin')

            expect(
                build({
                    role: ['member', 'admin']
                }, {
                    arrayFormat: 'index'
                })
            ).to.equal('role[0]=member&role[1]=admin')

            expect(
                build({
                    role: ['member', 'admin']
                })
            ).to.equal('role=member&role=admin')
        })

        it('should build undefined values correctly', () => {
            expect(build({
                role: undefined,
                abc: '123'
            }, {
                nullFormat: 'hidden'
            })).to.equal('abc=123')
        })

        it('should build null values correctly', () => {
            expect(build({
                role: null
            })).to.equal('role')

            expect(build({
                role: null
            }, {
                nullFormat: 'string'
            })).to.equal('role=null')

            expect(build({
                role: null,
                abc: '123'
            }, {
                nullFormat: 'hidden'
            })).to.equal('abc=123')
        })
    })
})
