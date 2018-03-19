import {
    decode,
    encode,
    Options,
    makeOptions
} from './encode'
import { getSearch, parseName, isSerialisable } from './utils'

/**
 * Parse a querystring and return an object of parameters
 */
export const parse = (path: string, opts?: Options): object => {
    const options = makeOptions(opts)

    return getSearch(path)
        .split('&')
        .reduce((params, param) => {
            const [rawName, value] = param.split('=')
            const { hasBrackets, name } = parseName(rawName)
            const currentValue = params[name]
            const decodedValue = decode(value, options)

            if (currentValue === undefined) {
                params[name] = hasBrackets ? [decodedValue] : decodedValue
            } else {
                params[name] = [].concat(currentValue, decodedValue)
            }

            return params
        }, {})
}

/**
 * Build a querystring from an object of parameters
 */
export const build = (params: object, opts?: Options): string => {
    const options = makeOptions(opts)

    return Object.keys(params)
        .filter(paramName => isSerialisable(params[paramName]))
        .map(paramName => encode(paramName, params[paramName], options))
        .join('&')
}

export interface OmitResponse {
    removedParams: object
    querystring: string
}

/**
 * Remove a list of parameters from a querystring
 */
export const omit = (
    path: string,
    paramsToOmit: string[],
    opts?: Options
): OmitResponse => {
    const options = makeOptions(opts)
    const searchPart = getSearch(path)
    if (searchPart === '') {
        return {
            removedParams: {},
            querystring: ''
        }
    }

    const [kept, removed] = path.split('&').reduce(
        ([left, right]: [string[], string[]], chunk: string) => {
            const rawName = chunk.split('=')[0]
            const { name } = parseName(rawName)

            return paramsToOmit.indexOf(name) === -1
                ? [left.concat(chunk), right]
                : [left, right.concat(chunk)]
        },
        [[], []]
    )

    return {
        removedParams: parse(removed.join('&'), options),
        querystring: kept.join('&')
    }
}

export interface KeepResponse {
    keptParams: object
    querystring: string
}

/**
 * Remove a list of parameters from a querystring
 */
export const keep = (
    path: string,
    paramsToKeep: string[],
    opts?: Options
): KeepResponse => {
    const options = makeOptions(opts)
    const searchPart = getSearch(path)
    if (searchPart === '') {
        return {
            keptParams: {},
            querystring: ''
        }
    }

    const [kept, removed] = path.split('&').reduce(
        ([left, right]: [string[], string[]], chunk: string) => {
            const rawName = chunk.split('=')[0]
            const { name } = parseName(rawName)

            return paramsToKeep.indexOf(name) >= 0
                ? [left.concat(chunk), right]
                : [left, right.concat(chunk)]
        },
        [[], []]
    )

    return {
        keptParams: parse(kept.join('&'), options),
        querystring: kept.join('&')
    }
}