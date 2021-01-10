const connection = require('./connection');

const queryExecute = (sql, params = '') => {

    return new Promise((resolve, reject) => {

        connection.query(sql, params, (error, results, fieldsTable) => {
 
            if (error) reject(error);
            else resolve(results);
 
        });
    });
}

module.exports = queryExecute;