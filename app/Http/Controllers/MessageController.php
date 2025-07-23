<?php

namespace App\Http\Controllers;

use App\Services\MessageService;
use WP_Error;

class MessageController
{
    public $messageService;
    public function __construct()
    {
        $this->messageService = new MessageService();
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

        // --- Email Sending Logic (Admin Email remains plain text for simplicity) ---

        // 1. Send email to the website owner (can remain plain text or be converted to HTML)
        $admin_email = 'daniel.lesiewicz.dev@gmail.com'; // Set your desired admin email here
        $admin_subject = 'New Contact Form Submission from ' . get_bloginfo('name');
        $admin_body = "You have received a new message from your website.\n\n" .
            "Name: " . $firstname . "\n" .
            "Email: " . $user_email . "\n" .
            "Message:\n" . $user_message;
        $admin_headers = array('Content-Type: text/plain; charset=UTF-8');
        wp_mail($admin_email, $admin_subject, $admin_body, $admin_headers);

        // 2. Send thank you email to the user with custom styles and logo
        $user_subject = 'Thank You for Your Message to ' . get_bloginfo('name');

        // Define your logo URL
        // Make sure this URL is publicly accessible.
        // For a logo in your theme's images folder:
        $logo_url = get_template_directory_uri() . '/assets/images/logo_large.png';
        // Or if it's in your uploads folder:
        // $logo_url = wp_get_attachment_url(YOUR_LOGO_ATTACHMENT_ID); // Replace with your logo's attachment ID

        // Construct the HTML email body
        ob_start(); // Start output buffering to build HTML content
        ?>
        <!DOCTYPE html>
        <html>

        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title><?php echo esc_html($user_subject); ?></title>
            <style type="text/css">
                /* Basic Reset */
                body,
                table,
                td,
                a {
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }

                table,
                td {
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }

                img {
                    -ms-interpolation-mode: bicubic;
                }

                /* General Styles */
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                    font-family: Arial, Helvetica, sans-serif;
                    color: #333333;
                    line-height: 1.6;
                }

                table {
                    border-collapse: collapse !important;
                }

                a {
                    text-decoration: none;
                    color: #0073aa;
                }

                /* WordPress blue */
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .header {
                    background-color: #E6F5EC;
                    /* WordPress blue */
                    padding: 20px;
                    text-align: center;
                }

                .header img {
                    max-width: 150px;
                    height: auto;
                    display: block;
                    margin: 0 auto;
                }

                .content {
                    padding: 30px;
                }

                .footer {
                    background-color: #eeeeee;
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #666666;
                }

                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin-top: 20px;
                    border-radius: 50px;
                    background-color: #144D29;
                    color: #F7F9F7;
                    text-decoration: none;
                    border-radius: 5px;
                }

                .button:hover {
                    background-color: #E6F5EC;
                    color: #144D29 !important;
                }
            </style>
        </head>

        <body>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td align="center" style="padding: 20px 0;">
                        <table class="container" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td class="header">
                                    <a href="<?php echo esc_url(home_url()); ?>">
                                        <img src="<?php echo esc_url($logo_url); ?>"
                                            alt="<?php echo esc_attr(get_bloginfo('name')); ?> Logo">
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td class="content">
                                    <p>Witaj <?php echo esc_html($firstname); ?>,</p>
                                    <p>Dziękujemy za kontakt. Otrzymaliśmy Twoją wiadomość i dziękujemy za kontakt.
                                        Nasz zespół przeanalizuje Twoje zapytanie i skontaktuje się z Tobą najszybciej, jak to
                                        możliwe,
                                        zazwyczaj w ciągu 24-48 godzin roboczych..</p>
                                    <p>Twoja wiadomość:</p>
                                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                                    <p
                                        style="background-color: #F7F9F7; padding: 15px; border-left: 3px solid #144D29; white-space: pre-wrap; word-break: break-word;">
                                        <?php echo esc_html($user_message); ?>
                                    </p>
                                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                                    <p>W międzyczasie Odwiedź nas:</p>
                                    <p style="text-align: center;">
                                        <a href="<?php echo esc_url(home_url()); ?>" class="button">Odwiedź naszą stronę</a>
                                    </p>
                                    <p>Pozdrowienia <br>Właściciel <?php echo esc_html(get_bloginfo('name')); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <td class="footer">
                                    <p>&copy; <?php echo date('Y'); ?>         <?php echo esc_html(get_bloginfo('name')); ?>. All rights
                                        reserved.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>

        </html>
        <?php
        $user_body = ob_get_clean(); // Get the HTML content and clear the buffer

        // Set headers for HTML email
        $user_headers = array(
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . get_bloginfo('name') . ' <no-reply@' . parse_url(home_url(), PHP_URL_HOST) . '>' // Important for sender identity
        );
        wp_mail($user_email, $user_subject, $user_body, $user_headers);

        // --- End Email Sending Logic ---

        return rest_ensure_response([
            "data" => [
                "id" => $message_id,
                "firstname" => $firstname,
                "email" => $user_email,
                "message" => $user_message
            ],
            "status" => 201,
            "message" => "Message created successfully and emails sent."
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