# search-params

> A module to manipulate search part of URLs (querystring). Created to externalise some code shared by [path-parser](troch/path-parser) and [route-node](troch/route-node).

## API

#### parse(querystring: String): Array[Object]

Parse a querystring to a parameters list (an array of objects with name and value properties)

#### toObject(paramList: Array[Object]): Object

Convert a list of parameters to an object (key-value pairs)

#### build(paramList: Array): String

Build a querystring from a list of parameters

#### omit(querystring: String, paramsToOmit: Array[String]): String

Remove a list of parameters (names) from a querystring

#### withoutBrackets(paramName: String): Boolean

Return true if a parameter ends with `[]`.

## Example

For more examples, look at the tests.

```js
import { parse, build, toObject, omit } from 'search-params';

parse('country=scotland&town=glasgow');
// [
//     { name: 'country', value: 'scotland' },
//     { name: 'town', value: 'glasgow' }
// ]

build([
    { name: 'country', value: 'scotland' },
    { name: 'town', value: 'glasgow' }
])
// 'country=scotland&town=glasgow'

toObject([
    { name: 'country', value: 'scotland' },
    { name: 'town', value: 'glasgow' }
])
// {
//     country: 'scotland',
//     town: 'glasgow'
// }

omit(country=scotland&town=glasgow, [ 'country '])
// 'town=glasgow'
```
