<?php

namespace App;

use App\Admin\EmailAdmin;
use App\Admin\MetaAdmin;
use App\DB\MessageTable;
use App\DB\MetaTable;
use App\Http\Api;
use App\Http\GoogleConsent;
use App\Scripts\Scripts;

use App\DB\GalleryTable;

new Scripts();
Api::init();
add_action('init', function () {
    if (is_admin() && class_exists('App\Admin\EmailAdmin')) {
        new EmailAdmin();
        new MetaAdmin();
    }
});

$metadata_table = new MetaTable();
$metadata_table::create();
add_action('after_setup_theme', function () {
    // new GoogleConsent();
    $message_table = new MessageTable();
    $message_table::create();
    $gallery_table = new GalleryTable();
    $gallery_table::create();
    if (!get_option('lesio_eu_tables_created')) {

        update_option('lesio_eu_tables_created', 1);
    }
});

