const db = require('../config/connection');

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