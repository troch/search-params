import { Options } from './encode';
/**
 * Parse a querystring and return an object of parameters
 */
export declare const parse: (path: string, opts?: Options) => object;
/**
 * Build a querystring from an object of parameters
 */
export declare const build: (params: object, opts?: Options) => string;
export interface OmitResponse {
    removedParams: object;
    querystring: string;
}
/**
 * Remove a list of parameters from a querystring
 */
export declare const omit: (path: string, paramsToOmit: string[], opts?: Options) => OmitResponse;
export interface KeepResponse {
    keptParams: object;
    querystring: string;
}
/**
 * Remove a list of parameters from a querystring
 */
export declare const keep: (path: string, paramsToKeep: string[], opts?: Options) => KeepResponse;
