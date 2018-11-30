
/**
 * Check if two objects have equal keys and values, non-recursive
 * @param {object} a
 * @param {object} b
 * @return {boolean}
 */
exports.objectEquals = function(a, b) {
    // Borrowed from http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (let i=0; i<aProps.length; i++) {
        const propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
};
