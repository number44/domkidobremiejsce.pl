<?php
namespace App\Http;
use App\Http\Routes;

class Api
{
    public static function init()
    {
        add_action(
            'rest_api_init',
            function () {
                Routes::galleryRoutes('gallery', 'App\Http\Controllers\GalleryController');
                Routes::messageRoutes('message', 'App\Http\Controllers\MessageController');
                Routes::metaRoutes('metadata', 'App\Http\Controllers\MetaController');
            }
        );
    }
}