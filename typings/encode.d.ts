export declare type arrayFormat = 'none' | 'brackets' | 'index';
export declare type booleanFormat = 'none' | 'string' | 'unicode' | 'empty-true';
export declare type nullFormat = 'default' | 'string' | 'hidden';
export interface IOptions {
    arrayFormat?: arrayFormat;
    booleanFormat?: booleanFormat;
    nullFormat?: nullFormat;
}
export interface IFinalOptions {
    arrayFormat: arrayFormat;
    booleanFormat: booleanFormat;
    nullFormat: nullFormat;
}
export declare const makeOptions: (opts?: IOptions) => IFinalOptions;
export declare const encodeArray: (name: string, arr: any[], opts: IFinalOptions) => string;
export declare const encode: (name: string, value: any, opts: IFinalOptions) => string;
export declare const decode: (value: any, opts: IFinalOptions) => string | boolean;
