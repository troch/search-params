import { expect } from 'chai'
import { parse, omit } from '../modules'

describe('query-string', () => {
    describe('parse', () => {
        it('should parse a querystring to a list of params', () => {
            expect(parse('users=t&role=admin')).to.eql([
                {
                    name: 'users',
                    value: 't'
                },
                {
                    name: 'role',
                    value: 'admin'
                }
            ])
        })

        it('should handle multiple parameters with the same name', () => {
            expect(parse('users=t&role=admin&role=moderator')).to.eql([
                {
                    name: 'users',
                    value: 't'
                },
                {
                    name: 'role',
                    value: 'admin'
                },
                {
                    name: 'role',
                    value: 'moderator'
                }
            ])
        })
    })

    describe('omit', () => {
        it('should remove parameters from search', () => {
            expect(omit('users=t&role=admin', [ 'role' ]))
                .to.equal('users=t');
        })
    })
})
