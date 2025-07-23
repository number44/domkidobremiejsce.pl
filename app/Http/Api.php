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
                Routes::all('gallery', 'App\Http\Controllers\GalleryController');
                Routes::free('message', 'App\Http\Controllers\MessageController');
            }
        );
    }
}