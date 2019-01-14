
/**
 * Check if two objects have equal keys and values, non-recursive
 * @param {Object} x
 * @param {Object} y
 * @return {boolean}
 */
exports.objectEquals = function objectEquals(x, y) {
    if (x === null || x === undefined || y === null || y === undefined) {
        return x === y;
    }

    // after this just checking type of one would be enough
    if (x.constructor !== y.constructor) {
        return false;
    }
    // if they are functions or RegExp, they should exactly refer to same one
    if (x instanceof Function || x instanceof RegExp) {
        return x === y;
    }

    if (x === y || x.valueOf() === y.valueOf()) {
        return true;
    }

    if (Array.isArray(x) && x.length !== y.length) {
        return false;
    }
    // if they are dates, they must had equal valueOf
    if (x instanceof Date) {
        return false;
    }

    // if they are strictly equal, they both need to be object at least
    if (!(x instanceof Object) || !(y instanceof Object)) {
        return false;
    }

    // recursive object equality check
    const p = Object.keys(x);
    return Object.keys(y).every((i) => p.indexOf(i) !== -1)
        && p.every((i) => objectEquals(x[i], y[i]));
};
