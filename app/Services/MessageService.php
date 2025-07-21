<?php
namespace App\Services;
class MessageService extends Service
{
    protected $table_name;

    public function __construct()
    {
        global $wpdb;
        $this->table_name = $wpdb->prefix . "message";
        parent::__construct($this->table_name);
    }
}