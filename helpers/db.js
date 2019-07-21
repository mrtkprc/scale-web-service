const mysql = require('mysql');
require('dotenv').config()

let m_dbName;


let pool;

function setDatabaseName(dbName){
    return new Promise((resolve,reject) => {
        pool = mysql.createPool({
            connectionLimit: 100,
            host: process.env.DB_ADRESS,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: dbName
        });

        m_dbName = dbName;
        if (pool !== null)
        {
            resolve(pool);
        }
        else
        {
            reject({status:false, error:"Pool is not created."});
        }
    });
}
function getDbName(){
    return m_dbName;
}

function execQuery(query)
{
    return new Promise((resolve,reject) => {
        pool.query(query, function (error, results, fields) {
            if(error === null)
            {
                resolve({
                    error,
                    results,
                    fields
                });
            }
            else
            {
                reject({
                    error
                });
            }
        });
    });
}

function getData(query, dbName){
    return new Promise((resolve,reject) => {
        setDatabaseName(dbName).then((data) => {
            execQuery(`${query}`)
                .then(data => data.results)
                .then((data) => {
                    resolve ({
                        status: true,
                        data
                    });
                }).catch((error) => {
                reject ({
                    status: false,
                    error
                });
            });
        }).catch((error) => {
            reject ({
                status: false,
                error
            });
        });
    });
};

module.exports.setDatabaseName = setDatabaseName;
module.exports.getDbName = getDbName;
module.exports.getData = getData;