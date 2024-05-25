const db = require('../config/connection');
const multer = require('multer');
const path = require('path');

module.exports.create = function (req, res) {
    try {
        const data = { ...req.body }
        db.query(`INSERT INTO thyroid_reports (test_date, tsh_level, t3_level, t4_level, free_t3_level, free_t4_level, tpoab_level, tgab_level, interpretation, recommendations, additional_notes) VALUES ("${data.test_date}", "${data.tsh_level}", "${data.t3_level}", "${data.t4_level}", "${data.free_t3_level}", "${data.free_t4_level}", "${data.tpoab_level}", "${data.tgab_level}", "${data.interpretation}", "${data.recommendations}", "${data.additional_notes}")`,
            (err, result) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                }
                console.log("Report row created");
                return res.status(200).json({
                    message: "Report data updated successfully!"
                })
            }
        );
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
}

const uploadFolder = 'G:\\Web Development\\QTIMinds\\qti\\medicare\\uploads';

const storage = multer.diskStorage({
    destination: function (_req, file, cb) {
        //console.log('file : ', file);
        return cb(null, uploadFolder)
    },
    filename: function (_req, file, cb) {
        //console.log('file from filename function : ', file);
        let origFileName = file.originalname.split('.')[0];
        let filename = origFileName + '-' + Date.now() + path.extname(file.originalname);
        //console.log('filename : ', filename);
        return cb(null, filename)
    }
});

const upload = multer({ storage: storage }).single('file');

module.exports.uploadFile = function (req, res) {
    console.log("file received");
    try {
        upload(req, res, function (err) {
            if (err) {
                // A Multer error occurred when uploading.
                console.log('multer error: ', err);
                return res.status(500).json({
                    message: "Internal server error",
                    error: err
                })
            } else {
                console.log(res);
                return res.status(200).json({
                    message: "Report uploaded successfully!",
                    filename: res.req.file.filename
                })
            }
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
}