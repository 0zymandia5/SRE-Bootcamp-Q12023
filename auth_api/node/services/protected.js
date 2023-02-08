import { createsMySQLInst } from '../services/mysql';
import { buildQuery } from '../services/mysql';
import { performQuery } from '../services/mysql';

require('dotenv').config();

const DB_CRED = (process.env.DB_CRED) ? JSON.parse(process.env.DB_CRED) : {};

const messageAuth = "You are under protected data"
const messageNoAuth = "You are not allowed to see data"

/**
* function protectFunction
* Used to validate the JWT token generate in the login request
* @param {String} authorization
* @return {String} messageAuth || messageNoAuth
*/
export const protectFunction = async (authorization = "") => {
  let [errorJWT, response] = parseJwt(authorization)
  if (errorJWT) {
    return messageNoAuth;
  } else {
    let dbcon = createsMySQLInst(DB_CRED);
    let query = buildQuery("queryByRole", response["role"]);
    let [error, results] = await performQuery(dbcon, query)
    if (error || results.length == 0) {
      return messageNoAuth;
    } else {
      return messageAuth;
    }
  }
}

/**
* function parseJwt
* Used to decode a JWT
* @param {String} token
* @return {Array} [BooleanFlag, jsonfromJWT]
*/
function parseJwt(token = "") {
  try {
    let jsonFromJWT = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    return [false, jsonFromJWT];
  } catch (error) {
    return [true, error];
  }
}
