<?php

namespace App\Http\Controllers;

use App\Http\Emails\MessageEmail;
use App\Services\MessageService;
use App\Services\EmailService;
use App\Services\MetadataService;
use Exception;
use WP_Error;

class MetaController
{

    public $metadataService;
    public function __construct()
    {
        $this->metadataService = new MetadataService();
    }


    public function index($request = null)
    {
        global $wpdb;
        return rest_ensure_response([
            "status" => 200,
            "message" => "Success"
        ]);
    }
    public function show($request = null)
    {
        global $wpdb;
        $post_id = $request->get_param('post_id');
        $post_id_int = intval($post_id);
        $isRecordInDb = $this->metadataService->exists(['post_id' => $post_id_int]);
        $metadata = null;
        if ($isRecordInDb) {
            // Assuming you have a get method in metadataService that fetches the record
            // public function get($where_conditions) { ... }
            $metadata = $this->metadataService->getOneWhere(['post_id' => $post_id_int]);
        }
        return rest_ensure_response([
            "data" => [
                "post_id" => $post_id,
                "isRecord" => $isRecordInDb,
                'metadata' => $metadata ? $metadata : ''
            ],
            "status" => 200,
        ]);

    }

    public function store($request = null)
    {
        global $wpdb;
        $parameters = $request->get_json_params();

        $wpdb->query("START TRANSACTION");

        $created = $this->metadataService->create($parameters);
        if ($created === false) {
            $wpdb->query("ROLLBACK");
            return new WP_Error('db_create_error', 'Failed to create message.', ['status' => 500]);
        }
        $wpdb->query("COMMIT");

        return rest_ensure_response([
            "data" => [
                "parameters" => $parameters,
            ],
            "status" => 201,
            "message" => "Message created successfully"
        ]);
    }
    public function update($request = null)
    {
        global $wpdb;
        $parameters = $request->get_json_params();
        $post_id = $request->get_param('post_id');
        $post_id_int = intval($post_id);

        $wpdb->query("START TRANSACTION");

        $updated = $this->metadataService->updateWhere(['post_id' => $post_id_int], $parameters);

        if ($updated === false) {
            $wpdb->query("ROLLBACK");
            return new WP_Error('db_update_error', 'Failed to update message.', ['status' => 500]);
        }
        $wpdb->query("COMMIT");

        return rest_ensure_response([
            "data" => [
                "parameters" => $parameters,
                "updated" => $updated,
            ],
            "status" => 200,
            "message" => "Message updated successfully"
        ]);
    }
    public function destroy($request = null)
    {

    }
    public function search($request = null)
    {

    }
}