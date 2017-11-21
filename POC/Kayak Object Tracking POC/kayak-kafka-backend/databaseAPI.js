const mysql = require('mysql');

//Creating the mysql connection pool for reference documentation refer to below link
//https://github.com/mysqljs/mysql

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'Sunil@28',
    database: 'kayak',
    port: 3306

});

function executeQuery(callbackFunction, sqlQuery) {

    console.log("\nSQL Query::" + sqlQuery);
    console.log("\nAquiring Connection..");
    pool.getConnection(function(err, connection) {

        console.log("\nQuering Database..");
        connection.query(sqlQuery, function(error, rows, fields) {

            console.log("\nReleasing Connection ..");
            connection.release();

            if (error) {
                console.log("ERROR: " + error.message);
                throw error;
            } else {
                console.log("DB Results:" + rows);
                callbackFunction(err, rows);
            }

        });

    });

}

exports.executeQuery = executeQuery;
