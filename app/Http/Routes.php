<?php
namespace App\Http;

use App\Http\Middleware\Guards; // Import the Guards class
use WP_Error; // Still needed if WP_Error is directly used in Routes for other reasons, otherwise can be removed.

class Routes
{
    /**
     * @param string $slug
     * @param string $controller
     */
    public static function messageRoutes($slug, $controller)
    {
        $route_namespace = "lesio_theme_api/v1";
        $routes = [
            [
                'methods' => 'POST',
                'route' => '/' . $slug,
                'callback' => 'store',
                'permission_callback' => [Guards::class, 'postFromPage'], // Updated
                // 'permission_callback' => [Guards::class, 'getFromPage'], // Updated
            ],
            [
                'methods' => 'GET',
                'route' => '/' . $slug,
                'callback' => 'index',
                'permission_callback' => [Guards::class, 'adminOnly'], // Updated
            ],
            [
                'methods' => 'GET',
                'route' => '/' . $slug . '/(?P<id>\d+)',
                'callback' => 'show',
                'permission_callback' => [Guards::class, 'adminOnly'], // Updated
            ],
            [
                'methods' => 'PUT',
                'route' => '/' . $slug . '/(?P<id>\d+)',
                'callback' => 'update',
                'permission_callback' => [Guards::class, 'adminOnly'], // Updated
            ],
            [
                'methods' => 'DELETE',
                'route' => '/' . $slug . '/(?P<id>\d+)',
                'callback' => 'destroy',
                'permission_callback' => [Guards::class, 'adminOnly'], // Updated
            ],
        ];

        foreach ($routes as $route) {
            register_rest_route(
                $route_namespace,
                $route['route'],
                array(
                    'methods' => $route['methods'],
                    'callback' => function ($request = null) use ($controller, $route) {
                        $controller_instance = new $controller();
                        return $controller_instance->{$route['callback']}($request);
                    },
                    'permission_callback' => $route['permission_callback'],
                )
            );
        }
    }
    public static function metaRoutes($slug, $controller)
    {
        $route_namespace = "lesio_theme_api/v1";
        $routes = [
            [
                'methods' => 'GET',
                'route' => '/' . $slug,
                'callback' => 'index',
                'permission_callback' => [Guards::class, 'adminOnly'],
            ],
            [
                'methods' => 'GET',
                'route' => '/' . $slug . '/(?P<post_id>\d+)',
                'callback' => 'show',
                'permission_callback' => [Guards::class, 'adminOnly'],
            ],
            [
                'methods' => 'PUT',
                'route' => '/' . $slug . '/(?P<post_id>\d+)',
                'callback' => 'update',
                'permission_callback' => [Guards::class, 'adminOnly'], // If you want public PUT, otherwise consider 'postFromPage' or 'adminOnly'
            ],
            [
                'methods' => 'POST',
                'route' => '/' . $slug,
                'callback' => 'store',
                'permission_callback' => [Guards::class, 'getFromPage'], // If you want public POST, otherwise consider 'postFromPage' or 'adminOnly'
            ],
            [
                'methods' => 'DELETE',
                'route' => '/' . $slug . '/(?P<id>\d+)',
                'callback' => 'destroy',
                'permission_callback' => [Guards::class, 'adminOnly'], // If you want public DELETE, otherwise consider 'postFromPage' or 'adminOnly'
            ],
        ];
        foreach ($routes as $route) {
            register_rest_route(
                $route_namespace,
                $route['route'],
                array(
                    'methods' => $route['methods'],
                    'callback' => function ($request = null) use ($controller, $route) {
                        $controller_instance = new $controller();
                        return $controller_instance->{$route['callback']}($request);
                    },
                    'permission_callback' => $route['permission_callback'],

                )
            );
        }
    }
    public static function galleryRoutes($slug, $controller)
    {
        $route_namespace = "lesio_theme_api/v1";
        $routes = [
            [
                "methods" => "GET",
                "route" => "/testing",
                "callback" => "testing",
                'permission_callback' => [Guards::class, "getFromPage"],
            ],
            [
                'methods' => 'POST',
                'route' => '/' . $slug,
                'callback' => 'store',
                'permission_callback' => [Guards::class, 'getFromPage'], // If you want public POST, otherwise consider 'postFromPage' or 'adminOnly'
            ],
            [
                'methods' => 'GET',
                'route' => '/' . $slug,
                'callback' => 'index',
                'permission_callback' => [Guards::class, 'getFromPage'],
            ],
            [
                'methods' => 'GET',
                'route' => '/' . $slug . '/(?P<id>\d+)',
                'callback' => 'show',
                'permission_callback' => [Guards::class, 'getFromPage'],
            ],
            [
                'methods' => 'PUT',
                'route' => '/' . $slug . '/(?P<id>\d+)',
                'callback' => 'update',
                'permission_callback' => [Guards::class, 'getFromPage'], // If you want public PUT, otherwise consider 'postFromPage' or 'adminOnly'
            ],
            [
                'methods' => 'DELETE',
                'route' => '/' . $slug . '/(?P<id>\d+)',
                'callback' => 'destroy',
                'permission_callback' => [Guards::class, 'getFromPage'], // If you want public DELETE, otherwise consider 'postFromPage' or 'adminOnly'
            ],
        ];

        foreach ($routes as $route) {
            register_rest_route(
                $route_namespace,
                $route['route'],
                array(
                    'methods' => $route['methods'],
                    'callback' => function ($request = null) use ($controller, $route) {
                        $controller_instance = new $controller();
                        return $controller_instance->{$route['callback']}($request);
                    },
                    'permission_callback' => $route['permission_callback'],

                )
            );
        }
    }


}