/**
 * Error namespace
 */
class BundleError extends Error {
    /**
     * @param {string} message
     */
    constructor(message) {
        super(message);
        this.name = 'BundleError';
    }
}

module.exports = BundleError;
