<?php
namespace App\Services;
class GalleryService extends Service
{
    protected $table_name;

    public function __construct()
    {
        global $wpdb;
        $this->table_name = $wpdb->prefix . "gallery";
        parent::__construct($this->table_name);
    }
}