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
    })
})
