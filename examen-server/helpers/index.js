const dbValidators = require('./dbValidators');
const { returnsResponseCode } = require('./returnsResponseCode');

module.exports = {
    ...dbValidators,
    returnsResponseCode
}