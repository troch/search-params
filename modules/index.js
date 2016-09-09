// Split path
export const getPath = path => path.split('?')[0];
export const getSearch = path => path.split('?')[1];

// Search param value
const isSerialisable = val => val !== undefined && val !== null && val !== '';

// Search param name
const bracketTest = /\[\]$/;
export const hasBrackets = paramName => bracketTest.test(paramName);
export const withoutBrackets = paramName => paramName.replace(bracketTest, '');

/**
 * Parse a querystring and return a list of params (Objects with name and value properties)
 * @param  {String} querystring The querystring to parse
 * @return {Array[Object]}      The list of params
 */
export const parse = querystring =>
    querystring
        .split('&')
        .reduce((params, param) => {
            const split = param.split('=');
            const name = split[0];
            const value = split[1];

            return params.concat(
                split.length === 1
                    ? { name, value: true }
                    : { name, value: decodeURIComponent(value) }
            );
        }, []);

/**
 * Reduce a list of parameters (returned by `.parse()``) to an object (key-value pairs)
 * @param  {Array} paramList The list of parameters returned by `.parse()`
 * @return {Object}          The object of parameters (key-value pairs)
 */
export const toObject = paramList =>
    paramList
        .reduce((params, { name, value }) => {
            const isArray = hasBrackets(name);
            const currentValue = params[withoutBrackets(name)];

            if (currentValue === undefined) {
                params[withoutBrackets(name)] = isArray ? [ value ] : value;
            } else {
                params[withoutBrackets(name)] = [].concat(currentValue, value);
            }

            return params;
        }, {});

/**
 * Build a querystring from a list of parameters
 * @param  {Array} paramList The list of parameters (see `.parse()`)
 * @return {String}          The querystring
 */
export const build = paramList =>
    paramList
        .filter(({ value }) => value !== undefined && value !== null)
        .map(({ name, value }) => value === true ? name : `${name}=${encodeURIComponent(value)}`)
        .join('&');

/**
 * Remove a list of parameters from a querystring
 * @param  {String} querystring  The original querystring
 * @param  {Array}  paramsToOmit The parameters to omit
 * @return {String}              The querystring
 */
export const omit = (querystring, paramsToOmit) => {
    if (!querystring) return '';

    const remainingQueryParams = parse(querystring)
        .filter(({ name }) => paramsToOmit.indexOf(withoutBrackets(name)) === -1);
    const remainingQueryString = build(remainingQueryParams);

    return remainingQueryString || '';
};
