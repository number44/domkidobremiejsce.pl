<?php

namespace App\Http\Controllers;

use App\Services\GalleryService;
use WP_Error;

class GalleryController
{
    public $galleryService;
    public function __construct()
    {
        $this->galleryService = new GalleryService();
    }

    public function testing($request = null)
    {
        return rest_ensure_response([
            "test" => "value"
        ]);
    }
    public function index($request = null)
    {
        global $wpdb;

        $wpdb->query("START TRANSACTION");
        $all = $this->galleryService->getAll();
        if ($all === false) {
            $wpdb->query("ROLLBACK");
            return new WP_Error('not_found', 'Resource not found.', ['status' => 404]);
        }
        return rest_ensure_response([
            "data" => $all,
            "status" => 200,
            "message" => "Success"
        ]);
    }
    public function show($request = null)
    {
        global $wpdb;

        $id = $request->get_param('id');
        $wpdb->query("START TRANSACTION");
        $gallery = $this->galleryService->getOneWhere(["id" => $id]);
        if ($gallery === false) {
            $wpdb->query("ROLLBACK");
            return new WP_Error('not_found', 'The requested resource does not exist.', ['status' => 404]);
        }
        return rest_ensure_response([
            "data" => $gallery,
            "status" => 200,
            "message" => "Success"
        ]);
    }

    public function store($request = null)
    {
        global $wpdb;
        $parameters = $request->get_json_params();
        if (!array_key_exists('title', $parameters)) {
            return new WP_Error('db_create_error', 'Failed to create resource.', ['status' => 500]);
        }
        if (!array_key_exists('media_ids', $parameters)) {
            return new WP_Error('db_create_error', 'Failed to create resource.', ['status' => 500]);
        }

        $wpdb->query("START TRANSACTION");
        $gallery = $this->galleryService->create($parameters);

        if ($gallery === false) {
            $wpdb->query("ROLLBACK");
            return new WP_Error('error', 'Failed to create gallery.', ['status' => 500]);
        }
        $wpdb->query("COMMIT");
        return rest_ensure_response([
            "data" => $gallery,
            "status" => 201,
            "message" => "Gallery created successfully"
        ]);

    }
    public function update($request = null)
    {
        global $wpdb;

        $id = $request->get_param('id');
        if (!$id) {
            return new WP_Error('db_update_error', 'Failed to update resource.', ['status' => 500]);
        }
        $parameters = $request->get_json_params();

        if (!array_key_exists('title', $parameters)) {
            return new WP_Error('db_update_error', 'Failed to update resource.', ['status' => 500]);
        }
        if (!array_key_exists('media_ids', $parameters)) {
            return new WP_Error('db_update_error', 'Failed to update resource.', ['status' => 500]);
        }


        $gallery_updated = $this->galleryService->update($id, $parameters);

        if ($gallery_updated === false) {
            $wpdb->query("ROLLBACK");
            return new WP_Error('db_update_error', 'Failed to update resource.', ['status' => 500]);
        }

        $all_galeries = $this->galleryService->getAll();
        if ($all_galeries == false) {
            $wpdb->query("ROLLBACK");
            return new WP_Error('not_found', 'The requested resource does not exist.', ['status' => 404]);
        }

        $wpdb->query("COMMIT");

        return rest_ensure_response([
            "data" => [
                "gallery" => $gallery_updated,
                "galeries" => $all_galeries
            ],
            "status" => 200,
            "message" => "Gallery updated successfully"
        ]);
    }
    public function destroy($request = null)
    {
        global $wpdb;

        $id = $request->get_param('id');
        if (!$id) {
            return new WP_Error('db_update_error', 'Failed to update resource.', ['status' => 500]);
        }

        $gallery = $this->galleryService->delete($id);


        if ($gallery === false) {
            $wpdb->query("ROLLBACK");
            return new WP_Error('db_delete_error', 'Failed to delete resource.', ['status' => 500]);
        }
        $wpdb->query("COMMIT");

        return rest_ensure_response([
            "data" => $gallery,
            "status" => 200,
            "message" => "Gallery deleted successfully"
        ]);
    }
}