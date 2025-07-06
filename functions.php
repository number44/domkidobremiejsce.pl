<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}
require 'vendor/autoload.php';
// Academy php App + api 
require_once __DIR__ . '/app/boot.php';
// require_once __DIR__ . '/inc/getters.php';
// require_once __DIR__ . '/taxonomy_images/taxonomy_images.php';


if (!function_exists('bc_register_blocks')) {
    function bc_register_blocks()
    {
        register_block_type_from_metadata(__DIR__ . '/build/header');
    }
}
add_action('init', 'bc_register_blocks');
