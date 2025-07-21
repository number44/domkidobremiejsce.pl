<?php
if( ! function_exists( 'bc_register_blocks' ) ) {
  function bc_register_blocks() {
    register_block_type_from_metadata( __DIR__ . '/app/blocks/domki-about/build' );
    register_block_type_from_metadata( __DIR__ . '/app/blocks/domki-animacje/build' );
    register_block_type_from_metadata( __DIR__ . '/app/blocks/domki-contact/build' );
    register_block_type_from_metadata( __DIR__ . '/app/blocks/domki-empty/build' );
    register_block_type_from_metadata( __DIR__ . '/app/blocks/domki-footer/build' );
    register_block_type_from_metadata( __DIR__ . '/app/blocks/domki-form/build' );
    // register_block_type_from_metadata( __DIR__ . '/app/blocks/domki-gallery/build' );
    register_block_type_from_metadata( __DIR__ . '/app/blocks/domki-hero/build' );
    register_block_type_from_metadata( __DIR__ . '/app/blocks/domki-hotres/build' );
    register_block_type_from_metadata( __DIR__ . '/app/blocks/domki-instagram/build' );
    // register_block_type_from_metadata( __DIR__ . '/app/blocks/domki-inventory/build' );
    // register_block_type_from_metadata( __DIR__ . '/app/blocks/domki-navbar/build' );
    register_block_type_from_metadata( __DIR__ . '/app/blocks/domki-reservation/build' );
    register_block_type_from_metadata( __DIR__ . '/app/blocks/domki-seo/build' );
    register_block_type_from_metadata( __DIR__ . '/app/blocks/domki-test/build' );
    register_block_type_from_metadata( __DIR__ . '/app/blocks/domki-video/build' );
  }
  }
  add_action( 'init', 'bc_register_blocks' );
function fse_scripts() {
	wp_enqueue_style('fse-style',get_stylesheet_uri(),array(),wp_get_theme()->get( 'Version' ));
		 wp_enqueue_style('styles', get_template_directory_uri() . '/dist/index.css',array(),time() ,"all" );
		//  wp_enqueue_style('m-styles', get_template_directory_uri() . '/styles/mobile.css',array(),time() ,'(max-width: 996px)' );
		//  wp_enqueue_style('d-styles', get_template_directory_uri() . '/styles/desktop.css',array(),time() ,'(min-width: 996px)' );
		wp_enqueue_script( 'index', get_template_directory_uri() . '/dist/index.js', array(), true, 'all' );
}
add_action( 'wp_enqueue_scripts', 'fse_scripts' );
add_theme_support( 'align-wide' );
add_theme_support( 'wp-block-styles' );
require_once( get_template_directory() . '/app/config.php' );
function be_reusable_blocks_admin_menu() {
    add_menu_page( 'Reusable Blocks', 'Reusable Blocks', 'edit_posts', 'edit.php?post_type=wp_block', '', 'dashicons-editor-table', 22 );
}
add_post_type_support( 'page', 'excerpt' );
add_action( 'admin_menu', 'be_reusable_blocks_admin_menu' );


function wp_remove_scripts() {
  if (current_user_can( 'update_core' )) {
    return;
          }
          else {
            // Check for the page you want to target
            if ( is_page( 'homepage' ) ) {
              // Remove Scripts
              wp_dequeue_style( 'jquery-ui-core' );
            }
          }
        }
//       add_action( 'wp_enqueue_scripts', 'wp_remove_scripts', 99 );
// add_filter( 'wp_img_tag_add_decoding_attr', '__return_false' );
//require_once( get_template_directory() . '/register-blocks.php' );

add_image_size('small_screen', 485, 300, false);
add_image_size('medium_screen', 640, 480, false);

add_action('wp_enqueue_scripts', 'no_more_jquery');
function no_more_jquery(){
    wp_deregister_script('jquery');
}
/** * Completely Remove jQuery From WordPress */
function my_init() {
  if (!is_admin()) {
      wp_deregister_script('jquery');
      wp_register_script('jquery', false);
  }
}
add_action('wp_enqueue_scripts', 'my_init');