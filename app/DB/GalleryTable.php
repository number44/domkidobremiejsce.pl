<?php
namespace App\DB;

class GalleryTable
{
    public static function create()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'gallery';
        $charset_collate = $wpdb->get_charset_collate();
        $sql = "
            CREATE TABLE IF NOT EXISTS $table_name (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                title VARCHAR(100) NOT NULL,
                media_ids TEXT,
                PRIMARY KEY (id)
            ) $charset_collate;
        ";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}