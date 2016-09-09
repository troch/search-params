import { expect } from 'chai'
import { parse, omit, toObject, build } from '../modules'

describe('query-string', () => {
    describe('parse', () => {
        it('should parse a querystring to a list of params', () => {
            expect(parse('users=t&role=admin')).to.eql([
                { name: 'users', value: 't' },
                { name: 'role', value: 'admin' }
            ])
        })

        it('should handle multiple parameters with the same name', () => {
            expect(parse('users=t&role=admin&role=moderator')).to.eql([
                { name: 'users', value: 't' },
                { name: 'role', value: 'admin' },
                { name: 'role', value: 'moderator' }
            ])
        })
    })

    describe('omit', () => {
        it('should remove parameters from search', () => {
            expect(omit('users=t&role=admin', [ 'role' ]))
                .to.equal('users=t');
        })

        it('should omit all supplied parameters', () => {
            expect(omit('users=t&role=admin', [ 'users', 'role' ]))
                .to.equal('');
        })
    })

    describe('toObject', () => {
        it('should convert a list of parameters to an object', () => {
            expect(toObject(parse('users=t&role=admin')))
                .to.eql({
                    users: 't',
                    role: 'admin'
                });
        })

        it('should handle lists of values with square brackets', () => {
            expect(toObject(parse('users=t&role[]=admin&role[]=reviewer')))
                .to.eql({
                    users: 't',
                    role: [ 'admin', 'reviewer' ]
                });
        })

        it('should handle lists of values without square brackets', () => {
            expect(toObject(parse('users=t&role=admin&role=reviewer')))
                .to.eql({
                    users: 't',
                    role: [ 'admin', 'reviewer' ]
                });
        })
    })

    describe('build', () => {
        it('should build a querystring from a list of parameters', () => {
            expect(parse('users=t&role=admin&superAdmin&search=')).to.eql([
                { name: 'users', value: 't' },
                { name: 'role', value: 'admin' },
                { name: 'superAdmin', value: true },
                { name: 'search', value: '' }
            ])
        })

        it('should keep square brackets', () => {
            expect(build([
                { name: 'users', value: 't' },
                { name: 'role[]', value: 'admin' }
            ])).to.equal('users=t&role[]=admin')
        })

        expect(build([
            {
                name: 'model',
                value: undefined
            },
            {
                name: 'type',
                value: null
            },
            {
                name: 'electric',
                value: true
            },
            {
                name: 'gearbox',
                value: ''
            },
            {
                name: 'engine',
                value: '1.6'
            }
        ])).to.equal('electric&gearbox=&engine=1.6')
    })
})
