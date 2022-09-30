const dbValidators = require('./db-validators');
const webToken = require('./webtoken');
const googleVerify = require('./google-verify');
const uploadFile = require('./upload-file');



module.exports = {
    ...dbValidators,
    ...webToken,
    ...googleVerify,
    ...uploadFile,
}