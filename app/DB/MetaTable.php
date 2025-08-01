<?php
namespace App\DB;

class MetaTable
{
    public static function create()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'metadata';
        $charset_collate = $wpdb->get_charset_collate();
        $sql = "
            CREATE TABLE IF NOT EXISTS $table_name (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                post_id BIGINT(20) UNSIGNED NOT NULL,
                schema_type VARCHAR(255) DEFAULT 'WebPage' NOT NULL,
                google_rating VARCHAR(10) DEFAULT '' NULL,
                google_review_count BIGINT(20) UNSIGNED DEFAULT 0 NULL,
                street_address VARCHAR(255) DEFAULT '' NULL,
                address_locality VARCHAR(255) DEFAULT '' NULL,
                address_region VARCHAR(255) DEFAULT '' NULL,
                postal_code VARCHAR(20) DEFAULT '' NULL,
                address_country VARCHAR(10) DEFAULT 'PL' NULL,
                telephone VARCHAR(255) DEFAULT '' NULL,
                custom_description TEXT DEFAULT NULL, 
                last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE KEY (post_id)
            ) $charset_collate;
        ";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}