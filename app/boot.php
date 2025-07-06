<?php

namespace App;

use App\Scripts\Scripts;

new Scripts();


add_action('after_setup_theme', function () {
    if (!get_option('my_theme_table_created')) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'items_table';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "
            CREATE TABLE IF NOT EXISTS $table_name (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                price VARCHAR(100),
                PRIMARY KEY (id)
            ) $charset_collate;
        ";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);

        update_option('my_theme_table_created', 1);
    }
});