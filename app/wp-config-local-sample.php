<?php
define( 'DB_NAME', getenv("MYSQL_DATABASE"));
define( 'DB_USER', getenv("MYSQL_USER"));
define( 'DB_PASSWORD', getenv("MYSQL_PASSWORD"));
define( 'DB_HOST', 'db' ); // Probably 'localhost'

// ===========
// DEBUG
// ===========
ini_set( 'display_errors', 1 );
// define( 'SAVEQUERIES', true );
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_DISPLAY', true );

// ==============================================================
// Salts, for security
// Grab these from: https://api.wordpress.org/secret-key/1.1/salt
// TODO: добавить соль
// ==============================================================
define( 'AUTH_KEY',         'put your unique phrase here' );
define( 'SECURE_AUTH_KEY',  'put your unique phrase here' );
define( 'LOGGED_IN_KEY',    'put your unique phrase here' );
define( 'NONCE_KEY',        'put your unique phrase here' );
define( 'AUTH_SALT',        'put your unique phrase here' );
define( 'SECURE_AUTH_SALT', 'put your unique phrase here' );
define( 'LOGGED_IN_SALT',   'put your unique phrase here' );
define( 'NONCE_SALT',       'put your unique phrase here' );
