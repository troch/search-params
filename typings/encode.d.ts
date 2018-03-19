export declare type arrayFormat = 'none' | 'brackets' | 'index';
export declare type booleanFormat = 'none' | 'string' | 'unicode';
export interface Options {
    arrayFormat?: arrayFormat;
    booleanFormat?: booleanFormat;
}
export interface FinalOptions {
    arrayFormat: arrayFormat;
    booleanFormat: booleanFormat;
}
export declare const makeOptions: (opts?: Options) => FinalOptions;
export declare const encodeValue: (value: any) => string;
export declare const decodeValue: (value: string) => string;
export declare const encodeBoolean: (name: string, value: boolean, opts: FinalOptions) => string;
export declare const encodeArray: (name: string, arr: any[], opts: FinalOptions) => string;
export declare const encode: (name: string, value: any, opts: FinalOptions) => string;
export declare const decode: (value: any, opts: FinalOptions) => string | boolean;
