module.exports = {
    // print debug statements
    // 'debug': false,
    'debug': true,
	
	'serverHost': "192.168.31.31",
	'serverPort': 8000,
	'maxConnections': 100,

	// can create these using ./setup/create-certs.sh
	'caCert': './certs/ca.crt',
	'caKey': './certs/ca.key',

	// to be prompted for a password, delete this field or
	// set it to a null string using '' (that's 2 single 
	// quotes with no spaces between)
	// 'caKeyPassword': 'password',
	'caKeyPasswordRequired': false,

	// how many days new certificates should be good for
	'daysToExpiration': 31,

    // SPA encryption key length in bytes, range is 64 to 256
    'encryptionKeyLen': 256,

	// SPA HMAC key length in bytes, range is 4 to 128
	'hmacKeyLen': 128,

	// database options
	'dbHost': 'localhost',
	'dbUser': 'sdp_controller',
	'dbPasswordRequired': true,

	// to be prompted for a password, delete this field or
	// set it to a null string using '' (that's 2 single 
	// quotes with no spaces between)
    'dbPassword': 'password',
    'dbName': 'sdp',
    
    // retry interval (milliseconds) for database failures
    'databaseRetryInterval': 5000,
    'databaseMaxRetries': 5,
    
    // interval (milliseconds) to check database for changes
    // that require sending updates to gateways
    'databaseMonitorInterval': 3000,
};
