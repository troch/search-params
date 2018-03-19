export declare const getSearch: (path: string) => string;
export declare const isSerialisable: (val: any) => boolean;
export interface IParsedName {
    hasBrackets: boolean;
    name: string;
}
export declare const parseName: (name: string) => IParsedName;
