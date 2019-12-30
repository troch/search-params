# [3.0.0](https://github.com/troch/search-params/compare/v2.1.3...v3.0.0) (2019-12-30)


### Maintain package

([#2](https://github.com/troch/search-params/issues/2)) ([f41f072](https://github.com/troch/search-params/commit/f41f0722c19bd896797fd24be7277a6ccf8f2138)):
- Update dev dependencies
- Switch to strict type checking (TypeScript)
- Add optional generic type to `parse` and `build`
- Fix bug on decoding values



<a name="2.1.3"></a>
## [2.1.3](https://github.com/troch/search-params/compare/v2.1.2...v2.1.3) (2018-06-05)


### Bug Fixes

* decode unicode values to account for them coming from a browser URL ([262db43](https://github.com/troch/search-params/commit/262db43))



<a name="2.1.2"></a>
## [2.1.2](https://github.com/troch/search-params/compare/v2.1.1...v2.1.2) (2018-03-27)


### Bug Fixes

* fix package.json config (sideEffects) and add module ([73fe800](https://github.com/troch/search-params/commit/73fe800))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/troch/search-params/compare/v2.1.0...v2.1.1) (2018-03-25)



<a name="2.1.0"></a>
# [2.1.0](https://github.com/troch/search-params/compare/v2.0.0...v2.1.0) (2018-03-25)


### Features

* add 'empty-true' options for booleans ([9e3950b](https://github.com/troch/search-params/commit/9e3950b))
* add 'nullFormat' option ([9b452db](https://github.com/troch/search-params/commit/9b452db))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/troch/search-params/compare/v1.3.0...v2.0.0) (2018-03-19)


### Code Refactoring

* major library refactor ([5b53d09](https://github.com/troch/search-params/commit/5b53d09))


### BREAKING CHANGES

* do NOT upgrade to version 2.x.x if you use router5@5.x.x, route-node@2.x.x or path-parser@3.x.x
* 'toObject' method has been removed
* 'parse' now returns an object of parameters rather than a list
* 'build' now takes an object of parameters rather than a list
* 'omit' now returns an object with 'removedParams' and 'querystring'
* 'getSearch' and `withoutBrackets` methods have been removed



<a name="1.3.0"></a>
# [1.3.0](https://github.com/troch/search-params/compare/v1.2.0...v1.3.0) (2016-09-09)


### Bug Fixes

* don't serialize undefined or null parameter, handle parsing and building true values ([41d700a](https://github.com/troch/search-params/commit/41d700a))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/troch/search-params/compare/v1.1.0...v1.2.0) (2016-03-29)



<a name="1.1.0"></a>
# [1.1.0](https://github.com/troch/search-params/compare/v1.0.0...v1.1.0) (2016-02-22)


### Features

* export hasBrackets and withoutBrackets functions ([84a5f0b](https://github.com/troch/search-params/commit/84a5f0b))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/troch/search-params/compare/584f20d...v1.0.0) (2016-02-20)


### Features

* add parse, build and omit functions ([584f20d](https://github.com/troch/search-params/commit/584f20d))
* add toObject function and add tests ([15bea67](https://github.com/troch/search-params/commit/15bea67))



