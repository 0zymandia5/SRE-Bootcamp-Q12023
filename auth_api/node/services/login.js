import { createsMySQLInst } from '../services/mysql';
import { buildQuery } from '../services/mysql';
import { performQuery } from '../services/mysql';

const jwt = require('jsonwebtoken');
const msgErrorCred = "The credentials sent are invalid"
const saltedSha512 = require('salted-sha512');

require('dotenv').config();

const DB_CRED = (process.env.DB_CRED) ? JSON.parse(process.env.DB_CRED) : {};
const JWT_SECRET = (process.env.JWT_SECRET) ? process.env.JWT_SECRET : "";

/**
* function loginFunction
* Used to match the username and password sent with the existing credentials in the database.
* @param {String} username
* @param {String} password
* @return {String} token || msgErrorCred
*/
export const loginFunction = async (username = "", password = "") => {
  let dbcon = createsMySQLInst(DB_CRED);
  let query = buildQuery("queryByUser",username);
  let [error, results] = await performQuery(dbcon, query)
  if (error || results.length == 0) {
    return msgErrorCred;
  } else {
    let matchPassResult = matchPassword(results[0].password, password, results[0].salt)
    if (matchPassResult) {
      let token = generateJWT(results[0].role)
      return token;
    }
    else {
      return msgErrorCred;
    }
  }
}

/**
* function matchPassword
* Used to match the pasword encrypted by sha512 against the password stored in the db.
* @param {String} passdb
* @param {String} passwordReq
* @param {String} salt
* @return {Boolean} Flag
*/
function matchPassword(passdb="", passwordReq="", salt="") {
  const saltedHash = saltedSha512(passwordReq, salt)
  return ((passdb === saltedHash) ? true : false)
}

/**
* function generateJWT
* Used to generate a JWT based in the user role
* @param {String} role
* @return {String} JWT
*/
function generateJWT(role=""){
  return (jwt.sign({ "role": role }, JWT_SECRET, { "noTimestamp": true }));
}