'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// Split path
var getPath = exports.getPath = function getPath(path) {
    return path.split('?')[0];
};
var getSearch = exports.getSearch = function getSearch(path) {
    return path.split('?')[1];
};

// Search param value
var isSerialisable = function isSerialisable(val) {
    return val !== undefined && val !== null && val !== '';
};

// Search param name
var bracketTest = /\[\]$/;
var hasBrackets = exports.hasBrackets = function hasBrackets(paramName) {
    return bracketTest.test(paramName);
};
var withoutBrackets = exports.withoutBrackets = function withoutBrackets(paramName) {
    return paramName.replace(bracketTest, '');
};

/**
 * Parse a querystring and return a list of params (Objects with name and value properties)
 * @param  {String} querystring The querystring to parse
 * @return {Array[Object]}      The list of params
 */
var parse = exports.parse = function parse(querystring) {
    return querystring.split('&').reduce(function (params, param) {
        var split = param.split('=');
        var name = split[0];
        var value = split[1];
        return params.concat({ name: name, value: decodeURIComponent(value) });
    }, []);
};

/**
 * Reduce a list of parameters (returned by `.parse()``) to an object (key-value pairs)
 * @param  {Array} paramList The list of parameters returned by `.parse()`
 * @return {Object}          The object of parameters (key-value pairs)
 */
var toObject = exports.toObject = function toObject(paramList) {
    return paramList.reduce(function (params, _ref) {
        var name = _ref.name;
        var value = _ref.value;

        var isArray = hasBrackets(name);
        var currentValue = params[withoutBrackets(name)];

        if (currentValue === undefined) {
            params[withoutBrackets(name)] = isArray ? [value] : value;
        } else {
            params[withoutBrackets(name)] = [].concat(currentValue, value);
        }

        return params;
    }, {});
};

/**
 * Build a querystring from a list of parameters
 * @param  {Array} paramList The list of parameters (see `.parse()`)
 * @return {String}          The querystring
 */
var build = exports.build = function build(paramList) {
    return paramList.map(function (_ref2) {
        var name = _ref2.name;
        var value = _ref2.value;
        return [name].concat(isSerialisable(value) ? encodeURIComponent(value) : []);
    }).map(function (param) {
        return param.join('=');
    }).join('&');
};

/**
 * Remove a list of parameters from a querystring
 * @param  {String} querystring  The original querystring
 * @param  {Array}  paramsToOmit The parameters to omit
 * @return {String}              The querystring
 */
var omit = exports.omit = function omit(querystring, paramsToOmit) {
    if (!querystring) return '';

    var remainingQueryParams = parse(querystring).filter(function (_ref3) {
        var name = _ref3.name;
        return paramsToOmit.indexOf(withoutBrackets(name)) === -1;
    });
    var remainingQueryString = build(remainingQueryParams);

    return remainingQueryString || '';
};