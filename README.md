# search-params

> A module to manipulate search part of URLs (querystring). Created to externalise some code shared by [path-parser](troch/path-parser) and [route-node](troch/route-node).

## API

#### parse: <T>(path: string, opts?: IOptions) => T

Parse a querystring and returns an object of parameters. See options below for available options. Optional generic type can be provided.

#### build: <T>(params: T, opts?: IOptions) => string

Build a querystring from a list of parameters. Optional generic type can be provided.

#### omit: (path: string, paramsToOmit: string[], opts?: IOptions) => IOmitResponse

Remove a list of parameters (names) from a querystring, and returns an object containing `removedParams` and `querystring`.

#### keep: (path: string, paramsToKeep: string[], opts?: IOptions) => IKeepResponse

Keep a list of parameters (names) from a querystring, and returns an object containing `keptParams` and `querystring`.

## Options

All options are optional.

- `arrayFormat`: Specifies how arrays should be stringified
  - `'none'` (default): no brackets or indexes are added to query parameter names (`'role=member&role=admin'`)
  - `'brackets`: brackets are added to query parameter names (`'role[]=member&role[]=admin'`)
  - `'index'`: brackets and indexes are added to query parameter names (`'role[0]=member&role[1]=admin'`)
- `booleanFormat`: specifies how boolean values are stringified and parsed
  - `'none'` (default): booleans are stringified to strings (`'istrue=true&isfalse=false'`)
  - `'empty-true'`: same as `'none'` except true values are stringified without value (`'istrue&isfalse=false'`). If you choose this boolean format, make sure to change the value of `'nullFormat'`.
  - `'string'`: same as `'none'` but `'true'` and `'false'` are parsed as booleans
  - `'unicode'`: `true` and `false` are displayed with unicode characters, and parsed as booleans (`'istrue=✓&isfalse=✗'`)
- `nullFormat`: specifies how null values are stringified and parsed
  - `'default'` (default): null values are stringified without equal sign and value (`'isnull'`)
  - `'string'`: null values are stringified to `'null'` (`'isnull=null'`) and parsed as null values
  - `'hidden'`: null values are not stringified

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
