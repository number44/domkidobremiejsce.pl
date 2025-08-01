<?php
namespace App\Services;
class MetadataService extends Service
{
    protected $table_name;

    public function __construct()
    {
        global $wpdb;
        $this->table_name = $wpdb->prefix . "metadata";
        parent::__construct($this->table_name);
    }
}