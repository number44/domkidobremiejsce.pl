<?php

namespace App\Models;

class Item
{
    private $table_name;

    public function __construct($table_name)
    {
        $this->table_name = $table_name;

    }
    public function create()
    {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();
        $sql = "
            CREATE TABLE IF NOT EXISTS $this->table_name (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                price VARCHAR(100)
                PRIMARY KEY (id)
            ) $charset_collate;
        ";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}
