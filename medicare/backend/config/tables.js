let db = require('./connection');

module.exports.createTables = () => {
    let table1 = "CREATE TABLE IF NOT EXISTS users (name VARCHAR(255), phone VARCHAR(20), email VARCHAR(255))";
    db.query(table1, (err, result) => {
        if (err) throw err;
        console.log("Table created");
    })
    // db.query("INSERT INTO users (name, phone, email) VALUES ('Test User', '9100765412', 'abc@gmail.com')",
    //     (err, result) => {
    //         if (err) throw err;
    //         console.log("Row created");
    //     }
    // );
}
