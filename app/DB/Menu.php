<?php
namespace App\DB;

class Menu
{
    public static function create()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'menu';
        $charset_collate = $wpdb->get_charset_collate();
        $sql = "
            CREATE TABLE IF NOT EXISTS $table_name (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                title VARCHAR(100) NOT NULL,
                PRIMARY KEY (id)
            ) $charset_collate;
        ";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}