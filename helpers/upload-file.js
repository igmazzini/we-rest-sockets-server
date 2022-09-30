const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( files , allowedExtensions = ['png', 'jpg', 'jpeg', 'pdf', 'txt', 'xlsx'], folder = '') => {


    return new Promise((resolve, reject) => {

        const { file } = files;      

        let extension = file.name.split('.');

        extension = extension[extension.length - 1];

        if (!allowedExtensions.includes(extension)) {

            return reject(`Extension '${extension}' is not allowed, allowed extensions are ${allowedExtensions}`);

        }

        const tempName = `${uuidv4()}.${extension}`;

        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

        file.mv(uploadPath, (err) => {

            if (err) {

                return reject(err.toString());
            }

            resolve(`File uploaded successfully`);
            
        });

    });


}

module.exports = {
    uploadFile
}