<?php
namespace App\Api\Model;
class AcademyCard
{
    public static function create()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'academy_card';
        $charset_collate = $wpdb->get_charset_collate();
        $sql = "
            CREATE TABLE IF NOT EXISTS $table_name (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                academy_name VARCHAR(255) NOT NULL,
                academy_url VARCHAR(255),
                academy_post_id INT UNSIGNED,
                academy_id INT UNSIGNED NOT NULL,
                logo_id INT UNSIGNED,
                promotion VARCHAR(50),
                city VARCHAR(100),
                city_id INT UNSIGNED,
                city_slug VARCHAR(100),
                area VARCHAR(100),
                area_slug VARCHAR(100),
                area_id INT UNSIGNED,
                count_faculties SMALLINT,
                count_courses SMALLINT,
                count_specialities SMALLINT,
                `type` VARCHAR(100),
                `type_id` VARCHAR(100),
                PRIMARY KEY (id),
                FOREIGN KEY (academy_id) REFERENCES {$wpdb->prefix}academy(id) ON DELETE CASCADE,
                INDEX (city),  
                INDEX (area),   
                INDEX (`type`)
            ) $charset_collate;
        ";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}