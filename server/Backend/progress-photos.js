const common = require('../common.js');
const db = require('./db.js');

/**
 * Create a progress photo in the database
 *
 * @param {String} userId
 * @param {Object} progressPhoto
 * @param {Function} callback
 */
const createProgressPhoto = function(userId, progressPhoto, callback) {
    progressPhoto._id = common.getUUID();

    db.createProgressPhoto(userId, progressPhoto, (err, progressPhotoObject) => {
        if (err) {
            return callback(err, null);
        }

        const progressPhotoObjectToReturn = {
            id: progressPhotoObject._id,
            creatorId: progressPhotoObject.creatorId,
            notes: progressPhotoObject.notes,
            date: progressPhotoObject.date,
            minImage: progressPhotoObject.minImage
        };

        return callback(null, progressPhotoObjectToReturn);
    });
};

/**
 * Gets the progress photos from the database
 *
 * @param {String} userId
 * @param {Function} callback
 */
const getProgressPhotos = function(userId, callback) {
    db.getProgressPhotos(userId, (err, progressPhotos) => {
        if (err) {
            return callback(err, null);
        }

        const progressPhotosObjectToReturn = progressPhotos.map(item => {
            return {
                id: item._id,
                creatorId: item.creatorId,
                notes: item.notes,
                date: item.date,
                minImage: item.minImage
            }
        });

        return callback(null, progressPhotosObjectToReturn);
    });
};

// <exports> -----------------------------------
exports.createProgressPhoto = createProgressPhoto;
exports.getProgressPhotos = getProgressPhotos;
// </exports> -----------------------------------
