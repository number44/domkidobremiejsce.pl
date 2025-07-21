<?php
namespace App\Scripts;

use App\Api\Config\Config;
class Scripts
{
    public function __construct()
    {

        add_action('admin_enqueue_scripts', function ($hook) {
            $this->ds_admin_scripts($hook);
        });
        add_action('wp_enqueue_scripts', function ($hook) {
            $this->ds_front_scripts($hook);
        });
        add_action('enqueue_block_assets', function () {
            $this->block_scripts();
        });
    }
    public function ds_admin_scripts($hook)
    {
        // $this->lazy_script();
        global $post;
        $post_id = isset($post->ID) ? $post->ID : null;
        $getPost = get_post($post_id);
        $tags = get_tags(array(
            'hide_empty' => false, // Set to true if you want only tags that have posts
        ));
        wp_localize_script('adminjs', 'wpApiSettings', array(
            'root' => esc_url_raw(rest_url()),
            'nonce' => wp_create_nonce('wp_rest'),
            'user' => wp_get_current_user(),
            "home_url" => get_home_url(),
            "post_id" => $post_id,
            "post" => $getPost,
            "post_type" => get_post_type($post_id) === "page" ? "pages" : (get_post_type($post_id) === "post" ? "posts" : get_post_type($post_id)),
            "post_category" => get_the_category($post_id),
            "tags" => $tags
        ));
        wp_enqueue_media();
        wp_enqueue_script('adminjs', get_template_directory_uri() . '/dist/admin/main.js', array(), '1.0.0', true);
        wp_enqueue_style('admincss', get_template_directory_uri() . '/dist/admin/main.css', array(), '1.0.0');
    }
    public function ds_front_scripts($hook)
    {
        wp_enqueue_style('main-style', get_template_directory_uri() . '/style.css');
        $post_id = get_the_ID() ?? 0;
        $getPost = get_post($post_id);
        $tags = get_tags(array(
            'hide_empty' => false, // Set to true if you want only tags that have posts
        ));
        wp_localize_script('frontjs', 'wpApiSettings', array(
            'root' => esc_url_raw(rest_url()),
            'nonce' => wp_create_nonce('wp_rest'),
            'user' => wp_get_current_user(),
            "home_url" => get_home_url(),
            "theme_url" => get_template_directory_uri(),
            "post_id" => $post_id,
            "post" => $getPost,
            "post_type" => get_post_type($post_id) === "page" ? "pages" : (get_post_type($post_id) === "post" ? "posts" : get_post_type($post_id)),
            "post_category" => get_the_category($post_id),
            "tags" => $tags,
            "editor_icons" => get_template_directory_uri() . '/assets/editor/'
        ));
        wp_enqueue_script('frontjs', get_template_directory_uri() . '/dist/front/main.js', array(), '1.0.0', true);
        wp_enqueue_style('frontcss', get_template_directory_uri() . '/dist/front/main.css', array(), '1.0.0');
    }
    public function lazy_script()
    {
        // wp_enqueue_script('lazyjs', get_template_directory_uri() . '/dist/lazyload.js', [], '1.0.0', true);
        // wp_enqueue_style('lazycss', get_template_directory_uri() . '/dist/lazyload.css', [], '1.0.0');
        // wp_enqueue_script('sliderjs', get_template_directory_uri() . '/dist/slider.js', [], '1.0.0', true);
    }
    public function block_scripts()
    {
        $post_id = get_the_ID() ?? 0;
        $getPost = get_post($post_id);
        $tags = get_tags(array(
            'hide_empty' => false, // Set to true if you want only tags that have posts
        ));

        // http://localhost/wp-json/lesio_theme_api/v1/
        wp_enqueue_script('frontjs', get_template_directory_uri() . '/dist/front/main.js', array(), '1.0.0', true);
        wp_localize_script('frontjs', 'wpApiSettings', array(
            "home_url" => get_home_url(),
            "theme_url" => get_template_directory_uri(),
            'nonce' => wp_create_nonce('wp_rest'),
            "api_url" => get_home_url() . "/wp-json/lesio_theme_api/v1/",
            "media_api_url" => get_home_url() . "/wp-json/wp/v2/media/",
        ));
        wp_enqueue_style('frontcss', get_template_directory_uri() . '/dist/front/main.css', array(), '1.0.0');
    }
}