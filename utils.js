
/**
 * Check if two objects have equal keys and values, non-recursive
 * @param {object} a
 * @param {object} b
 * @returns {boolean}
 */
exports.objectEquals = function(a, b) {
    // Borrowed from http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}