const path = require('path');
const fs = require('fs');
const CryptoJS = require('crypto-js');

const common = require('../../common.js');
const progressPhoto = require('./models/progress-photo');

const progressPhotosDir = path.join(__dirname, '../../progressPhotos');

/**
 * Creates a progress photo
 *
 * @param {String} userId
 * @param {Object} progressPhotoObject
 * @param {Function} callback
 * @returns {Function}
 */
const createProgressPhoto = function(userId, progressPhotoObject, callback) {
    let newProgressPhoto = new progressPhoto();

    newProgressPhoto._id = progressPhotoObject._id;
    newProgressPhoto.creatorId = userId;
    newProgressPhoto.notes = progressPhotoObject.notes;
    newProgressPhoto.date = progressPhotoObject.date;

    if (!fs.existsSync(progressPhotosDir)){
        fs.mkdirSync(progressPhotosDir);
        fs.chmodSync(progressPhotosDir, 0o400);
    }

    const filePath = `${progressPhotosDir}/${progressPhotoObject._id}.png`;
    const base64Data = progressPhotoObject.image.replace(/^data:image\/(.*);base64,/, "");

    fs.writeFileSync(filePath, CryptoJS.AES.encrypt(base64Data, 'random password').toString(), 'base64');

    newProgressPhoto.save(function(err) {
        if (err) {
            return callback(common.getError(6000), null);
        }

        const fileData = fs.readFileSync(filePath, { encoding: 'base64' });
        const bytes = CryptoJS.AES.decrypt(fileData, 'random password');
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        newProgressPhoto.image = originalText;

        return callback(null, newProgressPhoto);
    });
};

/**
 * Gets progress photos
 *
 * @param {String} creatorId
 * @param {Function} callback
 * @returns {Function}
 */
const getProgressPhotos = function(creatorId, callback) {
    progressPhoto.find({
        creatorId
    },
    ['_id', 'creatorId', 'workoutId', 'notes', 'date'],
    {
        sort: {
            date: -1
        }
    },
    function(err, progressPhotos) {
        if (err) {
            return callback(common.getError(6001), null);
        }

        const promises = progressPhotos.map(item => {
            return readFromFile(`${progressPhotosDir}/${item._id}.png`);
        })

        Promise.all(promises).then(result => {
            result.forEach((image, index) => {
                progressPhotos[index].image = image;
            });

            return callback(null, progressPhotos);
        });
    });
};

const readFromFile = function(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, { encoding: 'base64' }, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                const bytes = CryptoJS.AES.decrypt(data, 'random password');
                const originalText = bytes.toString(CryptoJS.enc.Utf8);

                resolve(originalText);
            }
        });
    });
};

// <exports> -----------------------------------
exports.createProgressPhoto = createProgressPhoto;
exports.getProgressPhotos = getProgressPhotos;
// </exports> -----------------------------------
