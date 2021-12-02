module.exports = () => {
	
	// NPM Modules
    require("dotenv").config();
	http = require('http');
	https = require('https');
	fs = require('fs');
	socketIO = require('socket.io');
	express = require("express");
	bodyParser = require("body-parser");
	ejs = require('ejs');
	path = require('path');
	mongoose = require('mongoose');
    amqp = require('amqp');
	redis = require("ioredis")
	
	// Loaders
	dbOps = require('./loaders/mongoose');
	rdsOps = require('./loaders/redis');
    amqpOps = require('./loaders/amqp');
    
    // connection status
    mongoConnected = false;
    redisConnected = false;
    amqpConnected = false;
}