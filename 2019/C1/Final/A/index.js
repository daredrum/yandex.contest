/**
 * @param {Object} api - исходное API
 * @returns {Object}
 */
module.exports = function promisify(api = {}) {
    return new Proxy({}, {
        get(target, prop) {
            if (api[prop] && api[prop].toString() === '[object Object]') {
                return promisify(api[prop]);
            }

            if (typeof api[prop] === 'function') {
                return (...arg) => new Promise((resolve, reject) => {
                    api[prop]((error, data) => error ? reject(error, data) : resolve(data), ...arg);
                });
            }

            if (api[prop]) {
                return api[prop];
            }
        }
    });
};
