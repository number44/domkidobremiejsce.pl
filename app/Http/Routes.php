<?php
namespace App\Http;
class Routes
{
    /**
     * @param string $slug
     * @param string $controller
     */
    public static function all($slug, $controller)
    {
        $route_namespace = "lesio_theme_api/v1";
        $routes = [


            [
                'methods' => 'POST',
                'route' => '/' . $slug,
                'callback' => 'store'
            ],
            [
                'methods' => 'GET',
                'route' => '/' . $slug,
                'callback' => 'index'
            ],
            [
                'methods' => 'GET',
                'route' => '/' . $slug . '/(?P<id>\d+)',
                'callback' => 'show'
            ],
            [
                'methods' => 'PUT',
                'route' => '/' . $slug . '/(?P<id>\d+)',
                'callback' => 'update'
            ],
            [
                'methods' => 'DELETE',
                'route' => '/' . $slug . '/(?P<id>\d+)',
                'callback' => 'destroy'
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
                    'permission_callback' => '__return_true',
                )
            );
        }

    }
    public static function free($slug, $controller)
    {
        $route_namespace = "lesio_theme_api/v1";
        $routes = [


            [
                'methods' => 'POST',
                'route' => '/' . $slug,
                'callback' => 'store'
            ],
            [
                'methods' => 'GET',
                'route' => '/' . $slug,
                'callback' => 'index'
            ],
            [
                'methods' => 'GET',
                'route' => '/' . $slug . '/(?P<id>\d+)',
                'callback' => 'show'
            ],
            [
                'methods' => 'PUT',
                'route' => '/' . $slug . '/(?P<id>\d+)',
                'callback' => 'update'
            ],
            [
                'methods' => 'DELETE',
                'route' => '/' . $slug . '/(?P<id>\d+)',
                'callback' => 'destroy'
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
                    'permission_callback' => '__return_true',
                )
            );
        }

    }

}