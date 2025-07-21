<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}
require 'vendor/autoload.php';
// Academy php App + api 
require_once __DIR__ . '/app/boot.php';
// require_once __DIR__ . '/inc/getters.php';
// require_once __DIR__ . '/taxonomy_images/taxonomy_images.php';
// Define a constant for your core plugin path (optional but good practice)
if (!defined('MY_SITE_CORE_PATH')) {
    define('MY_SITE_CORE_PATH', __DIR__ . "/");
}

require_once MY_SITE_CORE_PATH . 'inc/image-generator.php';

if (!function_exists('bc_register_blocks')) {
    function bc_register_blocks()
    {
        register_block_type_from_metadata(__DIR__ . '/build/domki-navbar');
        register_block_type_from_metadata(__DIR__ . '/build/domki-hero');
        register_block_type_from_metadata(__DIR__ . '/build/domki-about');
        register_block_type_from_metadata(__DIR__ . '/build/domki-instagram');
        register_block_type_from_metadata(__DIR__ . '/build/domki-reservation');
        register_block_type_from_metadata(__DIR__ . '/build/domki-empty');
        register_block_type_from_metadata(__DIR__ . '/build/domki-inventory');
        register_block_type_from_metadata(__DIR__ . '/build/domki-hotres');
        register_block_type_from_metadata(__DIR__ . '/build/domki-kids');
        register_block_type_from_metadata(__DIR__ . '/build/domki-area');
        register_block_type_from_metadata(__DIR__ . '/build/domki-form');
        register_block_type_from_metadata(__DIR__ . '/build/domki-video');

        register_block_type_from_metadata(__DIR__ . '/build/domki-galleries');

        register_block_type_from_metadata(__DIR__ . '/build/domki-footer');
    }
}

add_post_type_support('page', 'excerpt');
add_action('init', 'bc_register_blocks');


if (3 < 2) {
    add_filter('show_admin_bar', function ($show_admin_bar) {
        if (current_user_can("edit_posts")) {
            return false;
        }
        return $show_admin_bar;
    });
}

function my_custom_image_sizes()
{
    add_image_size('pattern-sm', 31, 35, true);
    add_image_size('pattern-lg', 314, 350, true);

    add_image_size('logo_desktop-sm', 6, 6, true);
    add_image_size('logo_desktop-lg', 64, 64, true);

    add_image_size('logo_mobile-sm', 6, 6, true);
    add_image_size('logo_mobile-lg', 136, 136, true);

    add_image_size('hero_logo-sm', 6, 6, true);
    add_image_size('hero_logo-lg', 176, 176, true);

    add_image_size('footer_logo-sm', 6, 6, true);
    add_image_size('footer_logo-lg', 124, 124, true);

    add_image_size('carousel-sm', 8, 7, true);
    add_image_size('carousel-lg', 830, 470, true);

    add_image_size('carousel_mobile-sm', 8, 7, true);
    add_image_size('carousel_mobile-lg', 400, 225, true);

    add_image_size('about_one-sm', 3, 5, true);
    add_image_size('about_one-lg', 384, 560, true);

    add_image_size('about_two-sm', 6, 4, true);
    add_image_size('about_two-lg', 600, 400, true);

    add_image_size('inventory-4/3-sm', 3, 2, true);
    add_image_size('inventory-4/3-lg', 300, 200, true);

    add_image_size('inventory-1/1-sm', 3, 3, true);
    add_image_size('inventory-1/1-lg', 300, 300, true);

    add_image_size('inventory-3/4-sm', 3, 4, true);
    add_image_size('inventory-3/4-lg', 300, 400, true);

    add_image_size('inventory-16/9-sm', 16, 9, true);
    add_image_size('inventory-16/9-lg', 300, 168, true);

    add_image_size('gallery-sm', 8, 8); // Max width 800, height auto (no cropping)
    add_image_size('gallery-lg', 800, 9999); // Max width 800, height auto (no cropping)

    add_image_size('element_icon-sm', 10, 10, true);
    add_image_size('element_icon-lg', 100, 100, true);
}


add_action('after_setup_theme', 'my_custom_image_sizes');

function cc_mime_types($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');
add_post_type_support('page', 'excerpt');


function add_page_schema_with_excerpt()
{
    // Only apply this schema to regular pages that have an excerpt
    if (is_page()) { // Check if it's a page
        global $post; // Get the global post object for the current page

        $page_title = get_the_title($post->ID);
        $page_url = get_permalink($post->ID);
        $page_excerpt = get_the_excerpt($post->ID); // Get the excerpt for the current page

        // Optional: If you want to use the excerpt as a description,
        // it's good practice to ensure it's not empty.
        $description = !empty($page_excerpt) ? $page_excerpt : get_bloginfo('description'); // Fallback to site description

        // --- IMPORTANT: Replace these with your actual business details and dynamic review data ---
        // As discussed, obtaining Google review data dynamically is the main challenge.
        // For this example, let's use placeholders.
        $google_rating = '4.9'; // Replace with actual average rating from Google Reviews
        $google_review_count = '350'; // Replace with actual total review count from Google Reviews

        // --- Determine the correct Schema @type for your page ---
        // This is crucial. If your page is about a LocalBusiness and displays its reviews,
        // then LocalBusiness is appropriate. If it's a blog post about something, use Article.
        $schema_type = 'WebPage'; // Default for a general page
        // You might change this based on the page's content, e.g.:
        // if ( is_page('about-us') ) { $schema_type = 'LocalBusiness'; }
        // if ( is_page('our-services') ) { $schema_type = 'Service'; }

        $schema_data = array(
            "@context" => "https://schema.org",
            "@type" => $schema_type,
            "name" => $page_title,
            "url" => $page_url,
            "description" => $description, // Using the excerpt as the description

            // Include aggregateRating only if it's relevant to the page content
            // and you have valid review data for it.
            // For a 'WebPage' or 'Article', you might be reviewing the page itself
            // or a product/service discussed on it.
            "aggregateRating" => array(
                "@type" => "AggregateRating",
                "ratingValue" => $google_rating,
                "reviewCount" => $google_review_count
            )
        );

        // If the page is specifically about a LocalBusiness, you'd add address, geo, etc.
        // Example if $schema_type was 'LocalBusiness':
        /*
        if ($schema_type == 'LocalBusiness') {
            $schema_data['address'] = array(
                "@type" => "PostalAddress",
                "streetAddress" => "Your Street Address",
                "addressLocality" => "Your City",
                "addressRegion" => "Your Region (e.g., Lodz Voivodeship)",
                "postalCode" => "Your Postal Code",
                "addressCountry" => "PL"
            );
            $schema_data['telephone'] = "+48-123-456-789"; // Your business phone number
            // Add more LocalBusiness properties as needed
        }
        */

        echo '<script type="application/ld+json">' . json_encode($schema_data) . '</script>';
    }
}

add_action('wp_head', 'add_page_schema_with_excerpt');