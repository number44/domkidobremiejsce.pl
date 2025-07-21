<?php
namespace App\DB;

class MessageTable
{
    public static function create()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'message';
        $charset_collate = $wpdb->get_charset_collate();
        $sql = "
            CREATE TABLE IF NOT EXISTS $table_name (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                firstname VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(100) NOT NULL,
                message TEXT NOT NULL,
                PRIMARY KEY (id)
            ) $charset_collate;
        ";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}