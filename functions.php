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
require_once MY_SITE_CORE_PATH . 'inc/google-consent.php';


if (!function_exists('bc_register_blocks')) {
    function bc_register_blocks()
    {
        register_block_type_from_metadata(__DIR__ . '/build/domki-navbar');
        register_block_type_from_metadata(__DIR__ . '/build/domki-hero');
        register_block_type_from_metadata(__DIR__ . '/build/domki-about');
        register_block_type_from_metadata(__DIR__ . '/build/domki-instagram');
        register_block_type_from_metadata(__DIR__ . '/build/domki-reservation');
        // register_block_type_from_metadata(__DIR__ . '/build/domki-empty');
        register_block_type_from_metadata(__DIR__ . '/build/domki-section');
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


/**
 * =========================================================================
 * PART 1: GOOGLE SCHEMA SETTINGS PANEL (COMPLETE)
 * =========================================================================
 *
 * This section creates a new sub-menu under "Settings" to input
 * all relevant LocalBusiness and review data.
 */

/**
 * Add a new page under Settings for the Google Review Schema.
 */
function my_google_schema_options_page()
{
    add_options_page(
        'Google Review Schema Settings', // Page title
        'Google Schema',                // Menu title
        'manage_options',               // Capability
        'google-schema-settings',       // Menu slug
        'my_google_schema_options_page_html' // Callback function
    );
}
add_action('admin_menu', 'my_google_schema_options_page');

/**
 * Register the settings and fields for the LocalBusiness Schema.
 */
function my_google_schema_settings_init()
{
    register_setting('google_schema_options', 'my_google_schema_options');

    add_settings_section(
        'my_google_schema_section',
        'Local Business & Google Reviews Data',
        'my_google_schema_section_callback',
        'google-schema-settings'
    );

    // Business details
    add_settings_field(
        'business_name_field',
        'Business Name',
        'my_google_schema_business_name_callback',
        'google-schema-settings',
        'my_google_schema_section'
    );
    add_settings_field(
        'business_street_address_field',
        'Street Address',
        'my_google_schema_business_street_address_callback',
        'google-schema-settings',
        'my_google_schema_section'
    );
    add_settings_field(
        'business_city_field',
        'City',
        'my_google_schema_business_city_callback',
        'google-schema-settings',
        'my_google_schema_section'
    );
    add_settings_field(
        'business_region_field',
        'Region (e.g., Lodz Voivodeship)',
        'my_google_schema_business_region_callback',
        'google-schema-settings',
        'my_google_schema_section'
    );
    add_settings_field(
        'business_postal_code_field',
        'Postal Code',
        'my_google_schema_business_postal_code_callback',
        'google-schema-settings',
        'my_google_schema_section'
    );
    add_settings_field(
        'business_country_field',
        'Country Code (e.g., PL)',
        'my_google_schema_business_country_callback',
        'google-schema-settings',
        'my_google_schema_section'
    );
    add_settings_field(
        'business_telephone_field',
        'Telephone Number',
        'my_google_schema_business_telephone_callback',
        'google-schema-settings',
        'my_google_schema_section'
    );

    // Google review data
    add_settings_field(
        'google_rating_field',
        'Google Average Rating',
        'my_google_schema_rating_callback',
        'google-schema-settings',
        'my_google_schema_section'
    );
    add_settings_field(
        'google_review_count_field',
        'Google Review Count',
        'my_google_schema_review_count_callback',
        'google-schema-settings',
        'my_google_schema_section'
    );
}
add_action('admin_init', 'my_google_schema_settings_init');

/**
 * Renders the settings page HTML.
 */
function my_google_schema_options_page_html()
{
    if (!current_user_can('manage_options')) {
        return;
    }
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        <form action="options.php" method="post">
            <?php
            settings_fields('google_schema_options');
            do_settings_sections('google-schema-settings');
            submit_button('Save Settings');
            ?>
        </form>
    </div>
    <?php
}

/**
 * Callback function for the settings section header.
 */
function my_google_schema_section_callback()
{
    echo '<p>Enter your business details and the latest Google review data. This information will be used to generate a complete and valid LocalBusiness Schema.org markup.</p>';
}

// Business details callbacks
function my_google_schema_business_name_callback()
{
    $options = get_option('my_google_schema_options');
    $name = isset($options['business_name']) ? esc_attr($options['business_name']) : '';
    echo '<input type="text" name="my_google_schema_options[business_name]" value="' . $name . '" class="regular-text" />';
}
function my_google_schema_business_street_address_callback()
{
    $options = get_option('my_google_schema_options');
    $address = isset($options['business_street_address']) ? esc_attr($options['business_street_address']) : '';
    echo '<input type="text" name="my_google_schema_options[business_street_address]" value="' . $address . '" class="regular-text" />';
}
function my_google_schema_business_city_callback()
{
    $options = get_option('my_google_schema_options');
    $city = isset($options['business_city']) ? esc_attr($options['business_city']) : '';
    echo '<input type="text" name="my_google_schema_options[business_city]" value="' . $city . '" class="regular-text" />';
}
function my_google_schema_business_region_callback()
{
    $options = get_option('my_google_schema_options');
    $region = isset($options['business_region']) ? esc_attr($options['business_region']) : '';
    echo '<input type="text" name="my_google_schema_options[business_region]" value="' . $region . '" class="regular-text" />';
}
function my_google_schema_business_postal_code_callback()
{
    $options = get_option('my_google_schema_options');
    $postal_code = isset($options['business_postal_code']) ? esc_attr($options['business_postal_code']) : '';
    echo '<input type="text" name="my_google_schema_options[business_postal_code]" value="' . $postal_code . '" class="regular-text" />';
}
function my_google_schema_business_country_callback()
{
    $options = get_option('my_google_schema_options');
    $country = isset($options['business_country']) ? esc_attr($options['business_country']) : 'PL';
    echo '<input type="text" name="my_google_schema_options[business_country]" value="' . $country . '" class="regular-text" />';
}
function my_google_schema_business_telephone_callback()
{
    $options = get_option('my_google_schema_options');
    $telephone = isset($options['business_telephone']) ? esc_attr($options['business_telephone']) : '';
    echo '<input type="tel" name="my_google_schema_options[business_telephone]" value="' . $telephone . '" class="regular-text" />';
}

// Google review data callbacks
function my_google_schema_rating_callback()
{
    $options = get_option('my_google_schema_options');
    $rating = isset($options['google_rating']) ? esc_attr($options['google_rating']) : '';
    echo '<input type="text" name="my_google_schema_options[google_rating]" value="' . $rating . '" />';
}
function my_google_schema_review_count_callback()
{
    $options = get_option('my_google_schema_options');
    $review_count = isset($options['google_review_count']) ? esc_attr($options['google_review_count']) : '';
    echo '<input type="text" name="my_google_schema_options[google_review_count]" value="' . $review_count . '" />';
}


/**
 * =========================================================================
 * PART 2: SCHEMA & META TAG MARKUP GENERATION
 * =========================================================================
 *
 * This section hooks into 'wp_head' to output the Schema.org JSON-LD
 * with a complete LocalBusiness schema for pages and BlogPosting for posts.
 */

/**
 * Adds a full LocalBusiness Schema.org markup to pages, and BlogPosting to posts.
 */
function add_local_business_schema()
{
    if (is_singular('page') || is_singular('post')) {
        global $post;
        $page_title = get_the_title($post->ID);
        $page_url = get_permalink($post->ID);
        $page_excerpt = get_the_excerpt($post->ID);

        $options = get_option('my_google_schema_options');

        $description = !empty($page_excerpt) ? $page_excerpt : get_bloginfo('description');

        // Only generate the full LocalBusiness schema on pages
        if (is_singular('page') && !empty($options['business_name'])) {
            $schema_data = array(
                "@context" => "https://schema.org",
                "@type" => "WebPage",
                "name" => $page_title,
                "url" => $page_url,
                "description" => $description,
                "mainEntity" => array(
                    "@type" => "LocalBusiness",
                    "name" => esc_attr($options['business_name']),
                    "url" => get_home_url(),
                    "address" => array(
                        "@type" => "PostalAddress",
                        "streetAddress" => isset($options['business_street_address']) ? esc_attr($options['business_street_address']) : '',
                        "addressLocality" => isset($options['business_city']) ? esc_attr($options['business_city']) : '',
                        "addressRegion" => isset($options['business_region']) ? esc_attr($options['business_region']) : '',
                        "postalCode" => isset($options['business_postal_code']) ? esc_attr($options['business_postal_code']) : '',
                        "addressCountry" => isset($options['business_country']) ? esc_attr($options['business_country']) : 'PL'
                    ),
                    "telephone" => isset($options['business_telephone']) ? esc_attr($options['business_telephone']) : '',
                )
            );

            // Add aggregateRating if data is available
            if (!empty($options['google_rating']) && !empty($options['google_review_count'])) {
                $schema_data['mainEntity']['aggregateRating'] = array(
                    "@type" => "AggregateRating",
                    "ratingValue" => esc_attr($options['google_rating']),
                    "reviewCount" => esc_attr($options['google_review_count'])
                );
            }
        }
        // For blog posts, we'll use a simpler BlogPosting schema
        else if (is_singular('post')) {
            $schema_data = array(
                "@context" => "https://schema.org",
                "@type" => "BlogPosting",
                "name" => $page_title,
                "url" => $page_url,
                "description" => $description
            );
        } else {
            // Fallback for pages without a business name
            $schema_data = array(
                "@context" => "https://schema.org",
                "@type" => "WebPage",
                "name" => $page_title,
                "url" => $page_url,
                "description" => $description
            );
        }

        echo '<script type="application/ld+json">' . json_encode($schema_data) . '</script>';
    }
}
add_action('wp_head', 'add_local_business_schema');


/**
 * Adds essential meta tags for SEO and social media sharing.
 */
function add_dynamic_meta_tags()
{
    if (is_singular('page') || is_singular('post')) {
        global $post;
        $post_title = get_the_title($post->ID);
        $post_url = get_permalink($post->ID);
        $post_excerpt = get_the_excerpt($post->ID);

        // Fallback for description if excerpt is empty
        $meta_description = !empty($post_excerpt) ? wp_strip_all_tags($post_excerpt, true) : get_bloginfo('description');

        // Get the featured image URL for social media previews
        $featured_image_url = get_the_post_thumbnail_url($post->ID, 'large');
        if (empty($featured_image_url)) {
            // Optional: Fallback to a default image URL if no featured image is set
            // $featured_image_url = 'https://example.com/default-image.jpg';
        }

        echo "\n\n";

        // Standard Meta Description for SEO
        echo '<meta name="description" content="' . esc_attr(substr($meta_description, 0, 155)) . '" />' . "\n";

        // Open Graph (Facebook, LinkedIn)
        echo '<meta property="og:title" content="' . esc_attr($post_title) . '" />' . "\n";
        echo '<meta property="og:url" content="' . esc_url($post_url) . '" />' . "\n";
        echo '<meta property="og:description" content="' . esc_attr(substr($meta_description, 0, 300)) . '" />' . "\n";
        echo '<meta property="og:type" content="article" />' . "\n";
        if (!empty($featured_image_url)) {
            echo '<meta property="og:image" content="' . esc_url($featured_image_url) . '" />' . "\n";
        }
        // Twitter Card
        echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
        echo '<meta name="twitter:title" content="' . esc_attr($post_title) . '" />' . "\n";
        echo '<meta name="twitter:description" content="' . esc_attr(substr($meta_description, 0, 200)) . '" />' . "\n";
        if (!empty($featured_image_url)) {
            echo '<meta name="twitter:image" content="' . esc_url($featured_image_url) . '" />' . "\n";
        }
        echo "\n\n";
    }
}
add_action('wp_head', 'add_dynamic_meta_tags');