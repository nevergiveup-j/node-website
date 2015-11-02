
module.exports = {
	port: process.env.PORT || 3001,
    cookieSecret: 'webAPI',
	mongodb: {
         host: 'localhost/',
         db: 'webAPI',
         port: '',
         username: 'admin',
         password: 'admin'
    }
}