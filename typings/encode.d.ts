export declare type arrayFormat = 'none' | 'brackets' | 'index';
export declare type booleanFormat = 'none' | 'string' | 'unicode';
export interface IOptions {
    arrayFormat?: arrayFormat;
    booleanFormat?: booleanFormat;
}
export interface IFinalOptions {
    arrayFormat: arrayFormat;
    booleanFormat: booleanFormat;
}
export declare const makeOptions: (opts?: IOptions) => IFinalOptions;
export declare const encodeArray: (name: string, arr: any[], opts: IFinalOptions) => string;
export declare const encode: (name: string, value: any, opts: IFinalOptions) => string;
export declare const decode: (value: any, opts: IFinalOptions) => string | boolean;
