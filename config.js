'use strict';
var path = require('path');

var publicDir = process.cwd() + '/public';

module.exports = {
	port: 3001,
	// 客户端路径
	publicDir: publicDir,
	mongodb: {
        // host: process.env.MONGODB_HOST || '',
        // port: process.env.MONGODB_PORT || '',
        // db: process.env.MONGODB_DATABASE || '',
        // username: process.env.MONGODB_USERNAME || '',
        // password: process.env.MONGODB_PASSWORD || ''
    },
}