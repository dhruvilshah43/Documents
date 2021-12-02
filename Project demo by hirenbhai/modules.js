const rs = require('randomstring');
require("dotenv").config();

const SERVER_PORT = process.argv[2] || 3000;
const SERVER_TYPE = process.argv[3] ? process.argv[3].toUpperCase() : 'SOCKET'; // API/SOCKET
const SERVICE_HOST = process.argv[5] || '192.168.0.106';	// host url

const randomStr = rs.generate(16);
const RANDOM_STR = rs.generate(10).toUpperCase();

config = module.exports = require('./config.json')

module.exports = {
	SERVER_PORT,
	SERVER_TYPE,
	SERVICE_HOST,
	RANDOM_STR,
	randomStr
}