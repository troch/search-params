# search-params

> A module to manipulate search part of URLs (querystring). Created to externalise some code shared by [path-parser](troch/path-parser) and [route-node](troch/route-node).

## API

#### parse: (path: string, opts?: IOptions) => object

Parse a querystring and returns an object of parameters. See options below for available options.

#### build: (params: object, opts?: IOptions) => string

Build a querystring from a list of parameters

#### omit: (path: string, paramsToOmit: string[], opts?: IOptions) => IOmitResponse

Remove a list of parameters (names) from a querystring, and returns an object containing `removedParams` and `querystring`.

#### keep: (path: string, paramsToKeep: string[], opts?: IOptions) => IKeepResponse

Keep a list of parameters (names) from a querystring, and returns an object containing `keptParams` and `querystring`.

## Options

- `arrayFormat`: Specifies how arrays should be stringified
    - `'none'` (default): no brackets or indexes are added to query parameter names (`'role=member&role=admin'`)
    - `'brackets`: brackets are added to query parameter names (`'role[]=member&role[]=admin'`)
    - `'index`: brackets and indexes are added to query parameter names (`'role[0]=member&role[1]=admin'`)
- `booleanFormat`: 'none', 'string'
    - `'none'` (default): booleans are stringified to strings (`'istrue=true&isfalse=false'`)
    - `'string'`: as above but `'true'` and `'false'` are parsed as booleans
    - `'unicode`: `true` and `false` are displayed with unicode characters, and parsed as booleans (`'istrue=✓&isfalse=✗'`)

## Example

For more examples, look at the tests.

```js
import { parse, build, omit, keep } from 'search-params'

parse('country=scotland&town=glasgow')
// {
//     country: 'scotland',
//     town: 'glasgow'
// }

build({
    country: 'scotland',
    town: 'glasgow'
})
// 'country=scotland&town=glasgow'

omit('country=scotland&town=glasgow', ['country '])
// {
//     removedParams: {
//         country: 'scotland'
//     },
//     querystring: 'town=glasgow'
// }

keep('country=scotland&town=glasgow', ['country '])
// {
//     keptParams: {
//         country: 'scotland'
//     },
//     querystring: 'country=scotland'
// }
```
