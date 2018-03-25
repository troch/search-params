import { IOptions } from './encode';
export { IOptions };
/**
 * Parse a querystring and return an object of parameters
 */
export declare const parse: (path: string, opts?: IOptions) => object;
/**
 * Build a querystring from an object of parameters
 */
export declare const build: (params: object, opts?: IOptions) => string;
export interface IOmitResponse {
    querystring: string;
    removedParams: object;
}
/**
 * Remove a list of parameters from a querystring
 */
export declare const omit: (path: string, paramsToOmit: string[], opts?: IOptions) => IOmitResponse;
export interface IKeepResponse {
    querystring: string;
    keptParams: object;
}
/**
 * Remove a list of parameters from a querystring
 */
export declare const keep: (path: string, paramsToKeep: string[], opts?: IOptions) => IKeepResponse;
