<?php
/*------------------------------------*\
    Theme assets
\*------------------------------------*/

function theme_assets() {
    // vendor
    wp_enqueue_style("vendor-style", get_template_directory_uri() . '/assets/css/vendor.bundle.css', array(), date("H:i:s"));
    wp_register_script('vendor', get_template_directory_uri() . '/assets/js/vendor.bundle.js', array(), date("H:i:s"), true);
    wp_enqueue_script("vendor");
    // main
    wp_enqueue_style("main-style", get_template_directory_uri() . '/assets/css/main.css', array(), date("H:i:s"));
    wp_register_script('main', get_template_directory_uri() . '/assets/js/main.js', array(), date("H:i:s"), true);
    wp_enqueue_script("main");
}

/*------------------------------------*\
	Actions + Filters + ShortCodes
\*------------------------------------*/
add_action('wp_enqueue_scripts', 'theme_assets');
