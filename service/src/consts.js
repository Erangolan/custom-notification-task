require('dotenv').config()

const packagejson = require('../package.json')

const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  PORT,
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY,
} = process.env

module.exports = {
  DB_HOST,
  DB_USER,
  DB_PASS,
  PORT,
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY,
  SERVICE_NAME: `${packagejson.name}:${packagejson.version}`,
}
