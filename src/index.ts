import { decode, encode, IOptions, makeOptions } from './encode'
import { getSearch, isSerialisable, parseName } from './utils'

export { IOptions }

export type SearchParamScalar = string | boolean | null

export type SearchParams = Record<
  string,
  string | boolean | null | Array<string | boolean | null> | undefined
>

/**
 * Parse a querystring and return an object of parameters
 */
export const parse = (path: string, opts?: IOptions): SearchParams => {
  const options = makeOptions(opts)

  return getSearch(path)
    .split('&')
    .reduce<SearchParams>((params, param) => {
      const [rawName, value] = param.split('=')
      const { hasBrackets, name } = parseName(rawName)
      const currentValue = params[name]
      const decodedValue = decode(value, options)

      if (currentValue === undefined) {
        params[name] = hasBrackets ? [decodedValue as string] : decodedValue
      } else {
        // @ts-ignore
        params[name] = [].concat(currentValue, decodedValue)
      }

      return params
    }, {})
}

/**
 * Build a querystring from an object of parameters
 */
export const build = (params: SearchParams, opts?: IOptions): string => {
  const options = makeOptions(opts)

  return Object.keys(params)
    .filter(paramName => isSerialisable(params[paramName]))
    .map(paramName => encode(paramName, params[paramName], options))
    .filter(Boolean)
    .join('&')
}

export interface IOmitResponse {
  querystring: string
  removedParams: object
}

/**
 * Remove a list of parameters from a querystring
 */
export const omit = (
  path: string,
  paramsToOmit: string[],
  opts?: IOptions
): IOmitResponse => {
  const options = makeOptions(opts)
  const searchPart = getSearch(path)
  if (searchPart === '') {
    return {
      querystring: '',
      removedParams: {}
    }
  }

  const [kept, removed] = path.split('&').reduce<[string[], string[]]>(
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
    querystring: kept.join('&'),
    removedParams: parse(removed.join('&'), options)
  }
}

export interface IKeepResponse {
  querystring: string
  keptParams: object
}

/**
 * Remove a list of parameters from a querystring
 */
export const keep = (
  path: string,
  paramsToKeep: string[],
  opts?: IOptions
): IKeepResponse => {
  const options = makeOptions(opts)
  const searchPart = getSearch(path)
  if (searchPart === '') {
    return {
      keptParams: {},
      querystring: ''
    }
  }

  const kept = path.split('&').reduce<string[]>((acc, chunk: string) => {
    const rawName = chunk.split('=')[0]
    const { name } = parseName(rawName)

    if (paramsToKeep.includes(name)) {
      acc.push(chunk)
    }

    return acc
  }, [])

  return {
    keptParams: parse(kept.join('&'), options),
    querystring: kept.join('&')
  }
}
