export type arrayFormat = 'none' | 'brackets' | 'index'
export type booleanFormat = 'none' | 'string' | 'unicode' | 'empty-true'
export type nullFormat = 'default' | 'string' | 'hidden'

export interface IOptions {
    arrayFormat?: arrayFormat
    booleanFormat?: booleanFormat
    nullFormat?: nullFormat
}

export interface IFinalOptions {
    arrayFormat: arrayFormat
    booleanFormat: booleanFormat
    nullFormat: nullFormat
}

export const makeOptions = (opts: IOptions = {}): IFinalOptions => ({
    arrayFormat: opts.arrayFormat || 'none',
    booleanFormat: opts.booleanFormat || 'none',
    nullFormat: opts.nullFormat || 'default'
})

const encodeValue = (value: any): string => encodeURIComponent(value)

const decodeValue = (value: string): string => decodeURIComponent(value)

const encodeBoolean = (
    name: string,
    value: boolean,
    opts: IFinalOptions
): string => {
    if (opts.booleanFormat === 'empty-true' && value) {
        return name
    }

    let encodedValue

    if (opts.booleanFormat === 'unicode') {
        encodedValue = value ? '✓' : '✗'
    } else {
        encodedValue = value.toString()
    }

    return `${name}=${encodedValue}`
}

const encodeNull = (name, opts: IFinalOptions): string => {
    if (opts.nullFormat === 'hidden') {
        return ''
    }

    if (opts.nullFormat === 'string') {
        return `${name}=null`
    }

    return name
}

type nameEncoder = (val: string, index: number) => string

const getNameEncoder = (opts: IFinalOptions): nameEncoder => {
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
    opts: IFinalOptions
): string => {
    const encodeName = getNameEncoder(opts)

    return arr
        .map((val, index) => `${encodeName(name, index)}=${encodeValue(val)}`)
        .join('&')
}

export const encode = (
    name: string,
    value: any,
    opts: IFinalOptions
): string => {
    if (value === null) {
        return encodeNull(name, opts)
    }

    if (typeof value === 'boolean') {
        return encodeBoolean(name, value, opts)
    }

    if (Array.isArray(value)) {
        return encodeArray(name, value, opts)
    }

    return `${name}=${encodeValue(value)}`
}

export const decode = (value: any, opts: IFinalOptions): boolean | string => {
    if (value === undefined) {
        return opts.booleanFormat === 'empty-true' ? true : null
    }

    if (opts.booleanFormat === 'string') {
        if (value === 'true') {
            return true
        }
        if (value === 'false') {
            return false
        }
    } else if (opts.booleanFormat === 'unicode') {
        if (value === '✓') {
            return true
        }
        if (value === '✗') {
            return false
        }
    } else if (opts.nullFormat === 'string') {
        if (value === 'null') {
            return null
        }
    }

    return decodeValue(value)
}
