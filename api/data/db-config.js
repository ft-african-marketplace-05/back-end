const knex = require("knex");
const configs = require("../../knexfile");
const environment = process.env.DB_ENV || 'development';

process.env.DATABASE_URL = 'postgres://ifappribkuqgjc:9bd623b3841a344a54805d604c8749b4030c99ef5be1a29cbe4e74cea605746d@ec2-44-194-112-166.compute-1.amazonaws.com:5432/dcljgcmke0t67e'

module.exports = knex(configs[environment]);
