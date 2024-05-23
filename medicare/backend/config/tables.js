const db = require('./connection');

module.exports.createTables = () => {
    
    // Create user table
    let table1 = "CREATE TABLE IF NOT EXISTS users (name VARCHAR(255), phone VARCHAR(20), email VARCHAR(255))";
    db.query(table1, (err, result) => {
        if (err) throw err;
        console.log("Users table created");
    })

    // Create reports table
    let table2 = "CREATE TABLE IF NOT EXISTS thyroid_reports (report_id INT NOT NULL AUTO_INCREMENT, test_date VARCHAR(20), tsh_level VARCHAR(10), t3_level VARCHAR(10), t4_level VARCHAR(10), free_t3_level VARCHAR(10), free_t4_level VARCHAR(10), tpoab_level VARCHAR(10), tgab_level VARCHAR(10), interpretation VARCHAR(255), recommendations VARCHAR(255), additional_notes VARCHAR(255), PRIMARY KEY (report_id))";
    // a file path field to be added for storing report file path
    db.query(table2, (err, result) => {
        if (err) throw err;
        console.log("Thyroid_reports table created");
    })
}
