<?php
namespace App\DB;

class MenuLink
{
    public static function create()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'menu_link';
        $charset_collate = $wpdb->get_charset_collate();
        $sql = "
            CREATE TABLE IF NOT EXISTS $table_name (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                title VARCHAR(100) NOT NULL,
                url VARCHAR(255) NOT NULL,
                menu_id INT UNSIGNED NOT NULL,
                order_by INT UNSIGNED NOT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (menu_id) REFERENCES {$wpdb->prefix}menu(id) ON DELETE CASCADE
            ) $charset_collate;
        ";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}