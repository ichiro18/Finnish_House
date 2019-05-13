<?php
// ===================================================
// Load database info and local development parameters
// ===================================================
if (file_exists( dirname(__FILE__) . '/wp-config-local.php')) {
    define( 'WP_ENV', "DEVELOPMENT");
    include( dirname(__FILE__) . '/wp-config-local.php');
} else {
    define( 'WP_ENV', 'PRODUCTION');
    define( 'DB_NAME', getenv('MYSQL_DATABASE'));
    define( 'DB_USER', getenv('MYSQL_USER'));
    define( 'DB_PASSWORD', getenv('MYSQL_PASSWORD'));
    define( 'DB_HOST', 'localhost' ); // Probably 'localhost'

    // ===========
    // DEBUG
    // ===========
    ini_set( 'display_errors', 0 );
    // define( 'SAVEQUERIES', false );
    define( 'WP_DEBUG', false );
    define( 'WP_DEBUG_DISPLAY', false );

    // ==============================================================
    // Salts, for security
    // Grab these from: https://api.wordpress.org/secret-key/1.1/salt
    // ==============================================================
    // TODO: добавить соль в entrypoint
    define( 'AUTH_KEY',         'put your unique phrase here' );
    define( 'SECURE_AUTH_KEY',  'put your unique phrase here' );
    define( 'LOGGED_IN_KEY',    'put your unique phrase here' );
    define( 'NONCE_KEY',        'put your unique phrase here' );
    define( 'AUTH_SALT',        'put your unique phrase here' );
    define( 'SECURE_AUTH_SALT', 'put your unique phrase here' );
    define( 'LOGGED_IN_SALT',   'put your unique phrase here' );
    define( 'NONCE_SALT',       'put your unique phrase here' );
}

// ========================
// Custom Content Directory
// ========================
define('WP_CONTENT_DIR', dirname(__FILE__) . '/content');
define( 'WP_CONTENT_URL', 'http://' . $_SERVER['HTTP_HOST'] . '/content' );

// ================================================
// You almost certainly do not want to change these
// ================================================
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

// ==============================================================
// Table prefix
// Change this if you have multiple installs in the same database
// ==============================================================
$table_prefix  = 'wp_';

// ================================
// Language
// Leave blank for American English
// ================================
define( 'WPLANG', 'ru_RU' );


// ========================
// Change default theme
// ========================
define( 'WP_DEFAULT_THEME', 'export-stroy-theme-main' );

// ======================================
// Load a Memcached config if we have one
// ======================================
if ( file_exists( dirname( __FILE__ ) . '/memcached.php' ) )
    $memcached_servers = include( dirname( __FILE__ ) . '/memcached.php' );

// ===================
// Bootstrap WordPress
// ===================
if ( !defined( 'ABSPATH' ) )
    define( 'ABSPATH', dirname( __FILE__ ) . '/wp/' );
require_once( ABSPATH . 'wp-settings.php' );
