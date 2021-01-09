const xss = require('xss');

const common = require('../../common.js');
const progressPhotos = require('../../Backend/progress-photos.js');

/**
 * Create a progress photo
 *
 * @param {Object} req
 * @param {Object} res
 */
const createProgressPhoto = (req, res) => {
    common.verifyToken (req, res, (req, res) => {
        const userId = req.authData.signObject._id;
        const notes = xss(req.body.notes);
        const date = xss(req.body.date);
        const image = req.body.image;

        const progressPhoto = {
            notes,
            date,
            image
        };

        progressPhotos.createProgressPhoto(userId, progressPhoto, (err, progressPhotoObject) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send(progressPhotoObject);
        });
    });
};

/**
 * Get progress photos
 *
 * @param {Object} req
 * @param {Object} res
 */
const getProgressPhotos = (req, res) => {
    common.verifyToken (req, res, (req, res) => {
        const userId = req.authData.signObject._id;

        progressPhotos.getProgressPhotos(userId, (err, progressPhotos) => {
            if (err) {
                return res.status(common.getStatus(err)).send(err);
            }

            return res.status(200).send(progressPhotos);
        });
    });
};

// <exports> ------------------------------------------------
exports.createProgressPhoto = createProgressPhoto;
exports.getProgressPhotos = getProgressPhotos;
// </exports> ------------------------------------------------
