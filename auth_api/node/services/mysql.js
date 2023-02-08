import 'regenerator-runtime/runtime'
const mysql = require('mysql');


/**
* function createsMySQLInst
* Used to create a mysql inst
* @return {Object} [mysql Inst]
*/
export const createsMySQLInst = (DB_CRED) => {

    let con = mysql.createConnection({
        host: DB_CRED["HOST"],
        user: DB_CRED["USER"],
        password: DB_CRED["PASSWORD"],
        database: DB_CRED["DB_NAME"]
    });
    return con;
}

/**
* function performQuery
* Used to perform a query into mysql db inst
* @param {Object} conn
* @param {String} query
* @return {Array} [error, results]
*/
export const performQuery = async (conn, query = "") => {
    try {
        if (conn) {
            try {
                return new Promise((resolve, reject) => {
                    conn.query(query, (error, results) => {
                        return resolve([error, results]);
                    });
                });
            } catch (error) {
                console.error(error);
            } finally {
                conn.end();
                console.log("connection to mysql closed");
            }
        } else {
            console.error("there is an error with the db instance");
        }
    } catch (error) {
        console.error(error);
    }
}

/**
* function buildQuery
* Used to build a query just replacing one match!!!
* @param {String} queryId
* @param {String} string2replace
* @return {String} query
*/
export const buildQuery = (queryId = "", string2replace = "") => {
    return (queriesDict[queryId] ? queriesDict[queryId].replace("Arg1", string2replace) : "")
}

const queriesDict = {
    "queryByUser": "SELECT * FROM users where username='Arg1'",
    "queryByRole": "SELECT * FROM users where role='Arg1'"
}