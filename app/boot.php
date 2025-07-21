<?php

namespace App;

use App\DB\MessageTable;
use App\Http\Api;
use App\Scripts\Scripts;

use App\DB\GalleryTable;

new Scripts();
Api::init();

add_action('after_setup_theme', function () {

    $message_table = new MessageTable();
    $message_table::create();

    if (!get_option('lesio_eu_tables_created')) {
        $gallery_table = new GalleryTable();
        $gallery_table::create();
        update_option('lesio_eu_tables_created', 1);
    }
});