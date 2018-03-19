export type arrayFormat = 'none' | 'brackets' | 'index'
export type booleanFormat = 'none' | 'string' | 'unicode'

export interface Options {
    arrayFormat?: arrayFormat
    booleanFormat?: booleanFormat
}

export interface FinalOptions {
    arrayFormat: arrayFormat
    booleanFormat: booleanFormat
}

export const makeOptions = (opts: Options = {}): FinalOptions => ({
    arrayFormat: opts.arrayFormat || 'none',
    booleanFormat: opts.booleanFormat || 'none'
})

const encodeValue = (value: any): string => encodeURIComponent(value)

const decodeValue = (value: string): string => decodeURIComponent(value)

const encodeBoolean = (
    name: string,
    value: boolean,
    opts: FinalOptions
): string => {
    let encodedValue

    if (opts.booleanFormat === 'unicode') {
        encodedValue = value ? '✓' : '✗'
    } else {
        encodedValue = value.toString()
    }

    return `${name}=${encodedValue}`
}

type nameEncoder = (val: string, index: number) => string

const getNameEncoder = (opts: FinalOptions): nameEncoder => {
    if (opts.arrayFormat === 'index') {
        return (name: string, index: number): string => `${name}[${index}]`
    }

    if (opts.arrayFormat === 'brackets') {
        return (name: string): string => `${name}[]`
    }

    return (name: string): string => name
}

export const encodeArray = (
    name: string,
    arr: any[],
    opts: FinalOptions
): string => {
    const nameEncoder = getNameEncoder(opts)

    return arr
        .map((val, index) => `${nameEncoder(name, index)}=${encodeValue(val)}`)
        .join('&')
}

export const encode = (
    name: string,
    value: any,
    opts: FinalOptions
): string => {
    if (value === null) {
        return name
    }

    if (typeof value === 'boolean') {
        return encodeBoolean(name, value, opts)
    }

    if (Array.isArray(value)) {
        return encodeArray(name, value, opts)
    }

    return `${name}=${encodeValue(value)}`
}

export const decode = (value: any, opts: FinalOptions): boolean | string => {
    if (value === undefined) {
        return null
    }

    if (opts.booleanFormat === 'string') {
        if (value === 'true') return true
        if (value === 'false') return false
    } else if (opts.booleanFormat === 'unicode') {
        if (value === '✓') return true
        if (value === '✗') return false
    }

    return decodeValue(value)
}
