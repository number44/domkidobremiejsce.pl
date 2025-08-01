<?php

namespace App\Http\Controllers;

use App\Http\Emails\MessageEmail;
use App\Services\MessageService;
use App\Services\EmailService;
use Exception;
use WP_Error;

class MessageController
{
    public $messageService;
    public $emailService;

    public function __construct()
    {
        $this->messageService = new MessageService();
        $this->emailService = new EmailService();
    }
    public function store($request = null)
    {
        global $wpdb;
        $parameters = $request->get_json_params();

        // Validate required parameters
        if (
            !array_key_exists('firstname', $parameters) ||
            !array_key_exists('email', $parameters) ||
            !array_key_exists('message', $parameters)
        ) {
            return new WP_Error('missing_parameters', 'Missing required parameters (firstname, email, message).', ['status' => 400]);
        }


        $logo_id = intval($parameters["logo_id"]);


        $firstname = sanitize_text_field($parameters['firstname']);
        $user_email = sanitize_email($parameters['email']);
        $user_message = sanitize_textarea_field($parameters['message']);
        $phone = sanitize_text_field($parameters['phone']);

        $wpdb->query("START TRANSACTION");
        $message_id = $this->messageService->create([
            'firstname' => $firstname,
            'email' => $user_email,
            'message' => $user_message,
            "phone" => $phone
        ]);

        if ($message_id === false) {
            $wpdb->query("ROLLBACK");
            return new WP_Error('db_create_error', 'Failed to create message.', ['status' => 500]);
        }
        $wpdb->query("COMMIT");

        $success = false;
        $admin_email_success = false;
        $user_email_success = false;

        // --- Email Sending Logic ---
        error_log("DEBUG: Starting email sending process for message ID: {$message_id}");

        try {
            // 1. Send notification email to admin
            $admin_email = 'daniel.lesiewicz.dev@gmail.com'; // Your admin email
            $admin_subject = 'New Contact Form Submission from ' . get_bloginfo('name');

            // Create HTML content for admin email
            $admin_content = "
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> {$firstname}</p>
                <p><strong>Email:</strong> {$user_email}</p>
                <p><strong>Phone:</strong> {$phone}</p>
                <p><strong>Message:</strong></p>
                <div style='background: #f5f5f5; padding: 15px; border-radius: 5px;'>
                    " . nl2br(esc_html($user_message)) . "
                </div>
            ";

            // You can use a simple logo media ID or 0 if no logo
            $admin_html_body = $this->emailService->getEmailHtml(
                $logo_id, // Media ID for logo (change to your logo's media ID)
                'New Contact Form Submission',
                $admin_content
            );

            $admin_email_success = $this->emailService->send(
                $admin_email,
                $admin_subject,
                $admin_html_body,
                true // HTML email
            );

            error_log("DEBUG: Admin email result: " . ($admin_email_success ? 'SUCCESS' : 'FAILED'));

            // 2. Send thank you email to the user
            $user_subject = 'Thank You for Your Message - ' . get_bloginfo('name');

            $user_content = "
                <p>Witaj {$firstname},</p>
                <p>Dziękujemy, że się z nami skontaktowałeś odezwiemy się jak najszybciej</p>
                <p><strong>Pozdrawiamy</strong></p>
                <p>Best regards,<br>The " . get_bloginfo('name') . " Team</p>
            ";

            $user_html_body = $this->emailService->getEmailHtml(
                $logo_id, // Media ID for logo
                'Dziękujemy za wiadomość',
                $user_content
            );

            $user_email_success = $this->emailService->send(
                $user_email,
                $user_subject,
                $user_html_body,
                true // HTML email
            );

            error_log("DEBUG: User email result: " . ($user_email_success ? 'SUCCESS' : 'FAILED'));

            // Overall success if both emails sent successfully
            $success = $admin_email_success && $user_email_success;

            error_log("DEBUG: Overall email success: " . ($success ? 'SUCCESS' : 'FAILED'));

        } catch (Exception $e) {
            error_log("Email sending error in MessageController: " . $e->getMessage());
            $success = false;
        }

        // --- End Email Sending Logic ---

        return rest_ensure_response([
            "data" => [
                "id" => $message_id,
                "firstname" => $firstname,
                "email" => $user_email,
                "message" => $user_message,
                "phone" => $phone,
                "email_success" => $success,
                "admin_email_sent" => $admin_email_success,
                "user_email_sent" => $user_email_success,
            ],
            "status" => 201,
            "message" => $success ? "Message created successfully and emails sent." : "Message created successfully but some emails failed to send."
        ]);
    }
    public function storeWorking($request = null)
    {
        global $wpdb;
        $parameters = $request->get_json_params();

        // Validate required parameters
        if (
            !array_key_exists('firstname', $parameters) ||
            !array_key_exists('email', $parameters) ||
            !array_key_exists('message', $parameters)
        ) {
            return new WP_Error('missing_parameters', 'Missing required parameters (firstname, email, message).', ['status' => 400]);
        }

        $firstname = sanitize_text_field($parameters['firstname']);
        $user_email = sanitize_email($parameters['email']);
        $user_message = sanitize_textarea_field($parameters['message']);
        $phone = sanitize_text_field($parameters['phone']);

        $wpdb->query("START TRANSACTION");
        $message_id = $this->messageService->create([
            'firstname' => $firstname,
            'email' => $user_email,
            'message' => $user_message,
            "phone" => $phone
        ]);

        if ($message_id === false) {
            $wpdb->query("ROLLBACK");
            return new WP_Error('db_create_error', 'Failed to create message.', ['status' => 500]);
        }
        $wpdb->query("COMMIT");

        $success = false;
        $admin_email_success = false;
        $user_email_success = false;

        // --- Email Sending Logic ---

        try {
            // 1. Send notification email to admin
            $admin_email = 'daniel.lesiewicz.dev@gmail.com'; // Your admin email
            $admin_subject = 'New Contact Form Submission from ' . get_bloginfo('name');

            // Create HTML content for admin email
            $admin_content = "
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> {$firstname}</p>
                <p><strong>Email:</strong> {$user_email}</p>
                <p><strong>Phone:</strong> {$phone}</p>
                <p><strong>Message:</strong></p>
                <div style='background: #f5f5f5; padding: 15px; border-radius: 5px;'>
                    " . nl2br(esc_html($user_message)) . "
                </div>
            ";

            // You can use a simple logo media ID or 0 if no logo
            $admin_html_body = $this->emailService->getEmailHtml(
                361, // Media ID for logo (change to your logo's media ID)
                'New Contact Form Submission',
                $admin_content
            );

            $admin_email_success = $this->emailService->send(
                $admin_email,
                $admin_subject,
                $admin_html_body,
                true // HTML email
            );

            // 2. Send thank you email to the user
            $user_subject = 'Thank You for Your Message - ' . get_bloginfo('name');

            $user_content = "
                <p>Dear {$firstname},</p>
                <p>Thank you for contacting us! We have received your message and will get back to you as soon as possible.</p>
                <p><strong>Your message:</strong></p>
                <div style='background: #f9f9f9; padding: 15px; border-left: 4px solid #0056b3; margin: 15px 0;'>
                    " . nl2br(esc_html($user_message)) . "
                </div>
                <p>We typically respond within 24-48 hours during business days.</p>
                <p>Best regards,<br>The " . get_bloginfo('name') . " Team</p>
            ";

            $user_html_body = $this->emailService->getEmailHtml(
                361, // Media ID for logo
                'Thank You for Your Message',
                $user_content
            );

            $user_email_success = $this->emailService->send(
                $user_email,
                $user_subject,
                $user_html_body,
                true // HTML email
            );

            // Overall success if both emails sent successfully
            $success = $admin_email_success && $user_email_success;

        } catch (Exception $e) {
            error_log("Email sending error in MessageController: " . $e->getMessage());
            $success = false;
        }

        // --- End Email Sending Logic ---

        return rest_ensure_response([
            "data" => [
                "id" => $message_id,
                "firstname" => $firstname,
                "email" => $user_email,
                "message" => $user_message,
                "phone" => $phone,
                "email_success" => $success,
                "admin_email_sent" => $admin_email_success,
                "user_email_sent" => $user_email_success,
            ],
            "status" => 201,
            "message" => $success ? "Message created successfully and emails sent." : "Message created successfully but some emails failed to send."
        ]);
    }


    public function store3($request = null)
    {


        global $wpdb;
        $parameters = $request->get_json_params();

        // Validate required parameters
        if (
            !array_key_exists('firstname', $parameters) ||
            !array_key_exists('email', $parameters) ||
            !array_key_exists('message', $parameters)
        ) {
            return new WP_Error('missing_parameters', 'Missing required parameters (firstname, email, message).', ['status' => 400]);
        }

        $firstname = sanitize_text_field($parameters['firstname']);
        $user_email = sanitize_email($parameters['email']);
        $user_message = sanitize_textarea_field($parameters['message']);
        $phone = sanitize_text_field($parameters['phone']);

        $wpdb->query("START TRANSACTION");
        $message_id = $this->messageService->create([
            'firstname' => $firstname,
            'email' => $user_email,
            'message' => $user_message,
            "phone" => $phone
        ]);

        if ($message_id === false) {
            $wpdb->query("ROLLBACK");
            return new WP_Error('db_create_error', 'Failed to create message.', ['status' => 500]);
        }
        $wpdb->query("COMMIT");


        $success = false;
        // --- Email Sending Logic  ---



        return rest_ensure_response([
            "data" => [
                "id" => $message_id,
                "firstname" => $firstname,
                "email" => $user_email,
                "message" => $user_message,
                "success" => $success,
            ],
            "status" => 201,
            "message" => "Message created successfully and emails sent."
        ]);
    }
    public function index($request = null)
    {
        global $wpdb;

        $wpdb->query("START TRANSACTION");
        $all = $this->messageService->getAll(['order_by' => 'id', 'order' => 'DESC']);
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
        $message = $this->messageService->getOneWhere(["id" => $id]);
        if ($message === false) {
            $wpdb->query("ROLLBACK");
            return new WP_Error('not_found', 'The requested resource does not exist.', ['status' => 404]);
        }
        return rest_ensure_response([
            "data" => $message,
            "status" => 200,
            "message" => "Success"
        ]);
    }


    public function store2($request = null)
    {
        global $wpdb;
        $parameters = $request->get_json_params();
        if (!array_key_exists('firstname', $parameters)) {
            return new WP_Error('db_create_error', 'Failed to create resource.', ['status' => 500]);
        }
        if (!array_key_exists('email', $parameters)) {
            return new WP_Error('db_create_error', 'Failed to create resource.', ['status' => 500]);
        }
        if (!array_key_exists('message', $parameters)) {
            return new WP_Error('db_create_error', 'Failed to create resource.', ['status' => 500]);
        }

        $wpdb->query("START TRANSACTION");
        $message = $this->messageService->create($parameters);

        if ($message === false) {
            $wpdb->query("ROLLBACK");
            return new WP_Error('error', 'Failed to create message.', ['status' => 500]);
        }
        $wpdb->query("COMMIT");





        return rest_ensure_response([
            "data" => $message,
            "status" => 201,
            "message" => "Message created successfully"
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


        $message_updated = $this->messageService->update($id, $parameters);

        if ($message_updated === false) {
            $wpdb->query("ROLLBACK");
            return new WP_Error('db_update_error', 'Failed to update resource.', ['status' => 500]);
        }

        $all_galeries = $this->messageService->getAll();
        if ($all_galeries == false) {
            $wpdb->query("ROLLBACK");
            return new WP_Error('not_found', 'The requested resource does not exist.', ['status' => 404]);
        }

        $wpdb->query("COMMIT");

        return rest_ensure_response([
            "data" => [
                "gallery" => $message_updated,
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

        $message = $this->messageService->delete($id);


        if ($message === false) {
            $wpdb->query("ROLLBACK");
            return new WP_Error('db_delete_error', 'Failed to delete resource.', ['status' => 500]);
        }
        $wpdb->query("COMMIT");

        return rest_ensure_response([
            "data" => $message,
            "status" => 200,
            "message" => "Gallery deleted successfully"
        ]);
    }
}