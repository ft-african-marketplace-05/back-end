const knex = require("knex");
const configs = require("../../knexfile");
const environment = process.env.DB_ENV || 'development';

process.env.DATABASE_URL = 'https://ft-african-marketplace-05-back.herokuapp.com/'

module.exports = knex(configs[environment]);
